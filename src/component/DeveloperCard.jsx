import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Avatar
} from '@mui/material';
import { Phone } from 'lucide-react';

const DeveloperCard = ({ developer }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: { xs: 360, sm: 400, md: 420 }, mx: 'auto', px: { xs: 1, sm: 0 } }}>
      <Paper
        elevation={2}
        sx={{
          width: '100%',
          minWidth: { xs: 300, sm: 340 },
          height: { xs: 200, sm: 210 },
          borderRadius: 3,
          position: 'relative',
          bgcolor: '#162236',
          border: '1px groove #1a2a3a',
          transition: 'all 0.3s ease',
          // overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-1px)',
            // boxShadow: '0 12px 30px rgba(195, 159, 88, 0.13)',
            borderColor: '#c39f589b'
          }
        }}
      >
        {/* Avatar - Fixed Top Left Overlap */}
        <Avatar
          sx={{
            width: { xs: 70, sm: 80 },
            height: { xs: 70, sm: 80 },
            bgcolor: 'linear-gradient(135deg, #C39F58 0%, #F4E5C3 100%)',
            color: '#0A1628',
            fontSize: { xs: 28, sm: 30 },
            fontWeight: 800,
            // border: '2px solid #162236ff',
            // boxShadow: '0 8px 25px rgba(195, 159, 88, 0.4)',
            position: 'absolute',
            top: { xs: -35, sm: -40 },
            left: { xs: 16, sm: 24 },
            zIndex: 10
          }}
        >
          {developer.name.charAt(0)}
        </Avatar>

        {/* Main Content */}
        <Box
          sx={{
            pt: { xs: 5.5, sm: 6 }, // Avatar ke niche perfect space
            px: { xs: 1.5, sm: 2 },
            pb: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Name */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.15rem', sm: '1.35rem' },
              color: '#F4E5C3',
              mb: 1
            }}
          >
            {developer.name}
          </Typography>

          {/* Specializations */}
          <Typography
            variant="body2"
            sx={{
              color: '#C39F58',
              fontWeight: 600,
              fontSize: { xs: '0.82rem', sm: '0.88rem' },
              letterSpacing: '0.5px',
              mb: 2,
              wordBreak: 'break-word'
            }}
          >
            {developer.specializations.slice(0, 4).join('  |  ')}
          </Typography>

          {/* Stats Row */}
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 2, sm: 3 }, 
            mb: 2.5,
            flexWrap: 'wrap'
          }}>
            <Box sx={{ textAlign: 'center', minWidth: 60 }}>
              <Typography sx={{ color: '#C39F58', fontWeight: 700, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                {developer.completedProjects}
              </Typography>
              <Typography variant="caption" sx={{ color: '#8A9BAE', fontSize: '0.73rem' }}>
                Projects
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center', minWidth: 60 }}>
              <Typography sx={{ color: '#C39F58', fontWeight: 700, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                {developer.experienceYears}+
              </Typography>
              <Typography variant="caption" sx={{ color: '#8A9BAE', fontSize: '0.73rem' }}>
                Years Exp
              </Typography>
            </Box>

            {developer.awards?.length > 0 && (
              <Box sx={{ textAlign: 'center', minWidth: 60 }}>
                <Typography sx={{ color: '#C39F58', fontWeight: 700, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                  {developer.awards.length}
                </Typography>
                <Typography variant="caption" sx={{ color: '#8A9BAE', fontSize: '0.73rem' }}>
                  Awards
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Contact Button - Fixed Position (Outside Card Bottom Right) */}
        <Box sx={{ 
          position: 'absolute', 
          bottom: { xs: -16, sm: -18 }, 
          right: { xs: 12, sm: 16 },
          zIndex: 11
        }}>
          <Button
            variant="contained"
            startIcon={<Phone size={16} />}
            sx={{
              bgcolor: '#ca9c41e3',
              border: '1px solid #C39F58',
              color: '#0A1628',
              fontWeight: 700,
              fontSize: { xs: '0.82rem', sm: '0.85rem' },
              px: { xs: 2.5, sm: 2 },
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              boxShadow: '0 4px 15px rgba(195, 159, 88, 0.3)',
              '&:hover': {
                bgcolor: '#C39F58',
                transform: 'translateY(-2px)',
                color: '#051c3fff',
              }
            }}
          >
            Contact Now
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default DeveloperCard;