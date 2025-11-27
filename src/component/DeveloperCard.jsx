import React from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
} from '@mui/material';
import { Phone, Briefcase, Award, Calendar, ChevronRight } from 'lucide-react';

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
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: `
              0 24px 48px rgba(0, 0, 0, 0.25),
              0 0 0 1px rgba(198, 169, 98, 0.5),
              0 0 30px rgba(198, 169, 98, 0.15)
            `,
          },
          // Gold top accent line
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: 'linear-gradient(90deg, #C6A962 0%, #E8D5A3 50%, #C6A962 100%)',
          },
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            pt: 4,
            px: 3,
            pb: 3,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 2.5,
          }}
        >
          {/* Avatar with Gold Ring */}
          <Avatar
            src={developer.logo}
            sx={{
              width: 68,
              height: 68,
              bgcolor: '#FBF7EF',
              color: '#C6A962',
              fontSize: '1.6rem',
              fontWeight: 700,
              fontFamily: '"Playfair Display", serif',
              border: '2px solid #C6A962',
              boxShadow: '0 4px 16px rgba(198, 169, 98, 0.25)',
              flexShrink: 0,
            }}
          >
            {developer.name?.charAt(0)}
          </Avatar>

          {/* Name & Specializations */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '1.2rem',
                color: '#0B1A2A',
                fontFamily: '"Playfair Display", serif',
                lineHeight: 1.25,
                mb: 1,
              }}
            >
              {developer.name}
            </Typography>

            <Typography
              sx={{
                color: '#C6A962',
                fontWeight: 600,
                fontSize: '0.72rem',
                letterSpacing: 0.3,
                lineHeight: 1.6,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {developer.specializations?.slice(0, 3).join('  •  ')}
            </Typography>
          </Box>
        </Box>

        {/* Stats Row */}
        <Box
          sx={{
            mx: 3,
            py: 2.5,
            px: 2,
            bgcolor: '#FAFBFC',
            borderRadius: 3,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            mb: 3,
          }}
        >
          {/* Projects */}
          <Box sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.75,
                mb: 0.5,
              }}
            >
              <Briefcase size={14} color="#C6A962" strokeWidth={2} />
              <Typography
                sx={{
                  color: '#0B1A2A',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  fontFamily: '"Playfair Display", serif',
                }}
              >
                {developer.completedProjects || 0}
              </Typography>
            </Box>
            <Typography
              sx={{
                color: '#6B7C93',
                fontSize: '0.65rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Projects
            </Typography>
          </Box>

          {/* Elegant Separator */}
          <Box
            sx={{
              width: 1,
              height: 36,
              background: 'linear-gradient(180deg, transparent 0%, #E0E4E8 50%, transparent 100%)',
            }}
          />

          {/* Experience */}
          <Box sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.75,
                mb: 0.5,
              }}
            >
              <Calendar size={14} color="#C6A962" strokeWidth={2} />
              <Typography
                sx={{
                  color: '#0B1A2A',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  fontFamily: '"Playfair Display", serif',
                }}
              >
                {developer.experienceYears || 0}+
              </Typography>
            </Box>
            <Typography
              sx={{
                color: '#6B7C93',
                fontSize: '0.65rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Years
            </Typography>
          </Box>

          {/* Elegant Separator */}
          <Box
            sx={{
              width: 1,
              height: 36,
              background: 'linear-gradient(180deg, transparent 0%, #E0E4E8 50%, transparent 100%)',
            }}
          />

          {/* Awards */}
          <Box sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.75,
                mb: 0.5,
              }}
            >
              <Award size={14} color="#C6A962" strokeWidth={2} />
              <Typography
                sx={{
                  color: '#0B1A2A',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  fontFamily: '"Playfair Display", serif',
                }}
              >
                {developer.awards?.length || 0}
              </Typography>
            </Box>
            <Typography
              sx={{
                color: '#6B7C93',
                fontSize: '0.65rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Awards
            </Typography>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            px: 3,
            pb: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* View Portfolio Link */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                '& .portfolio-text': {
                  color: '#C6A962',
                },
                '& .portfolio-icon': {
                  transform: 'translateX(4px)',
                  color: '#C6A962',
                },
              },
            }}
          >
            <Typography
              className="portfolio-text"
              sx={{
                color: '#6B7C93',
                fontSize: '0.8rem',
                fontWeight: 600,
                transition: 'color 0.3s ease',
              }}
            >
              View Portfolio
            </Typography>
            <ChevronRight 
              className="portfolio-icon"
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
              fontSize: '0.78rem',
              px: 3,
              py: 1.1,
              borderRadius: '100px',
              textTransform: 'none',
              boxShadow: '0 4px 16px rgba(198, 169, 98, 0.35)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #D4B36E 0%, #C6A962 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(198, 169, 98, 0.45)',
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