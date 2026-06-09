'use client';
import { Box, Typography, Avatar, useTheme } from '@mui/material';
import { BadgeCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ProjectDeveloperCard = ({
  developerName,
  developerLogo,
  developerDesc,
  developerSlug,
  developerId
}) => {
  const theme = useTheme();
  const logoPath = developerLogo
    ? (developerLogo.startsWith('/') ? developerLogo : `/${developerLogo}`)
    : undefined;

  const description = developerDesc || `${developerName} is one of the leading real estate developers in Dubai.`;
  const developerLink = `/developers/${developerSlug}-${developerId}`;

  return (
    <Box
      sx={{
        bgcolor: 'navy.main',
        borderRadius: 3,
        p: { xs: 2.5, md: 3 }
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '1.1rem', md: '1.25rem' },
          fontWeight: 700,
          color: 'common.white',
          mb: 2
        }}
      >
        About Developer
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'flex-start',
          flexWrap: { xs: 'wrap', sm: 'nowrap' }
        }}
      >
        <Avatar
          src={logoPath}
          sx={{
            width: { xs: 50, md: 60 },
            height: { xs: 50, md: 60 },
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
        </Avatar>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: 'common.white'
              }}
            >
              {developerName}
            </Typography>
            <BadgeCheck size={16} color={theme.palette.gold.main} />
          </Box>

          {/* Description - 3 lines only */}
          <Typography
            sx={{
              fontSize: { xs: '0.8rem', md: '0.85rem' },
              color: 'text.disabled',
              lineHeight: 1.7,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              mb: 1.5
            }}
          >
            {description}
          </Typography>

          {/* View All Details */}
          <Link href={developerLink} style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'gold.main',
                fontWeight: 600,
                fontSize: '0.8rem',
                mb: 1,
                transition: 'all 0.3s ease',
                '&:hover': { gap: 1, color: 'gold.light' }
              }}
            >
              View All Details
              <ArrowRight size={14} />
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectDeveloperCard;