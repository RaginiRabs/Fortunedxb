import React from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
} from '@mui/material';
import { Phone, ChevronRight, BadgeCheck } from 'lucide-react';

const DeveloperCard = ({ developer }) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 380,
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          bgcolor: '#FFFFFF',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: `
              0 24px 48px rgba(0, 0, 0, 0.22),
              0 0 0 1px rgba(198, 169, 98, 0.4),
              0 0 40px rgba(198, 169, 98, 0.12)
            `,
            '& .gold-bar': {
              background: 'linear-gradient(180deg, #E8D5A3 0%, #C6A962 50%, #A68B4B 100%)',
            },
            '& .project-count': {
              transform: 'scale(1.05)',
            },
          },
          // Left Gold Accent Bar
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: 4,
            background: 'linear-gradient(180deg, #C6A962 0%, #B8975A 50%, #C6A962 100%)',
            transition: 'all 0.4s ease',
          },
        }}
      >
        {/* Gold Bar Overlay for Hover */}
        <Box
          className="gold-bar"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: 4,
            background: 'linear-gradient(180deg, #C6A962 0%, #B8975A 50%, #C6A962 100%)',
            transition: 'all 0.4s ease',
            zIndex: 1,
          }}
        />

        {/* Main Content */}
        <Box
          sx={{
            pl: 3.5,
            pr: 3,
            pt: 3,
            pb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Avatar */}
          <Avatar
            src={developer.logo}
            sx={{
              width: 52,
              height: 52,
              bgcolor: '#FBF7EF',
              color: '#C6A962',
              fontSize: '1.3rem',
              fontWeight: 700,
              fontFamily: '"Playfair Display", serif',
              border: '2px solid #C6A962',
              boxShadow: '0 4px 12px rgba(198, 169, 98, 0.2)',
              flexShrink: 0,
            }}
          >
            {developer.name?.charAt(0)}
          </Avatar>

          {/* Name & Details */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Name + Verified */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  color: '#0B1A2A',
                  fontFamily: '"Playfair Display", serif',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {developer.name}
              </Typography>
              <BadgeCheck size={15} color="#C6A962" fill="#FBF7EF" />
            </Box>

            {/* Specialization */}
            <Typography
              sx={{
                color: '#6B7C93',
                fontSize: '0.68rem',
                fontWeight: 500,
                lineHeight: 1.4,
                mb: 0.25,
              }}
            >
              {developer.specializations?.slice(0, 2).join(' • ')}
            </Typography>

            {/* Years */}
            <Typography
              sx={{
                color: '#C6A962',
                fontSize: '0.65rem',
                fontWeight: 600,
              }}
            >
              {developer.experienceYears || 0}+ Years Experience
            </Typography>
          </Box>

          {/* Big Project Count */}
          <Box
            className="project-count"
            sx={{
              textAlign: 'right',
              flexShrink: 0,
              transition: 'transform 0.3s ease',
            }}
          >
            <Typography
              sx={{
                color: '#C6A962',
                fontWeight: 800,
                fontSize: '2rem',
                lineHeight: 1,
                fontFamily: '"Playfair Display", serif',
                textShadow: '0 2px 8px rgba(198, 169, 98, 0.2)',
              }}
            >
              {developer.completedProjects || 0}+
            </Typography>
            <Typography
              sx={{
                color: '#0B1A2A',
                fontWeight: 700,
                fontSize: '0.55rem',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Projects
            </Typography>
          </Box>
        </Box>

        {/* Divider */}
        <Box
          sx={{
            height: 1,
            ml: 3.5,
            mr: 3,
            background: 'linear-gradient(90deg, #E8ECF0 0%, transparent 100%)',
          }}
        />

        {/* Footer */}
        <Box
          sx={{
            pl: 3.5,
            pr: 3,
            py: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Explore Link */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.25,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                '& .explore-text': { color: '#C6A962' },
                '& .explore-icon': {
                  transform: 'translateX(4px)',
                  color: '#C6A962',
                },
              },
            }}
          >
            <Typography
              className="explore-text"
              sx={{
                color: '#6B7C93',
                fontSize: '0.78rem',
                fontWeight: 600,
                transition: 'color 0.3s ease',
              }}
            >
              Explore Projects
            </Typography>
            <ChevronRight
              className="explore-icon"
              size={16}
              color="#6B7C93"
              style={{ transition: 'all 0.3s ease' }}
            />
          </Box>

          {/* Contact Button */}
          <Button
            variant="contained"
            startIcon={<Phone size={14} />}
            sx={{
              background: 'linear-gradient(135deg, #C6A962 0%, #B8975A 100%)',
              color: '#0B1A2A',
              fontWeight: 700,
              fontSize: '0.72rem',
              px: 2.5,
              py: 0.9,
              borderRadius: '100px',
              textTransform: 'none',
              boxShadow: '0 4px 14px rgba(198, 169, 98, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #D4B36E 0%, #C6A962 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(198, 169, 98, 0.4)',
              },
            }}
          >
            Contact
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DeveloperCard;