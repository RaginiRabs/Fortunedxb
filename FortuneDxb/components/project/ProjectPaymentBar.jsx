'use client';
import { Box, Typography, useTheme } from '@mui/material';

const ProjectPaymentBar = ({ paymentPlan, bookingAmount, formatPrice }) => {
  const theme = useTheme();

  if (!paymentPlan) return null;

  // Parse payment plan (e.g., "20/60/20" or "10/40/50")
  const parts = paymentPlan.split('/').map(p => parseInt(p) || 0);

  // Labels for each section
  const labels = ['Booking', 'During Construction', 'On Handover', 'Post Handover'];

  // Colors for each section
  const colors = [
    theme.palette.gold.main,
    theme.palette.navy.light,
    theme.palette.navy.main,
    theme.palette.navy.dark,
  ];
  
  // Filter out zero percentages and create section objects
  const validParts = parts
    .map((percentage, i) => ({ 
      percentage, 
      label: labels[i], 
      color: colors[i] 
    }))
    .filter(p => p.percentage > 0);

  // If no valid parts, don't render
  if (validParts.length === 0) return null;

  return (
    <Box sx={{ mb: 5 }}>
      {/* Section Title */}
      <Typography 
        variant="h2" 
        sx={{ 
          fontSize: { xs: '1.1rem', md: '1.25rem' }, 
          fontWeight: 700,
          color: 'text.primary',
          mb: 3
        }}
      >
        Payment Plan
      </Typography>

      {/* Payment Bar */}
      <Box 
        sx={{ 
          display: 'flex', 
          borderRadius: 2, 
          overflow: 'hidden', 
          height: { xs: 50, md: 60 }, 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
        }}
      >
        {validParts.map((part, i) => (
          <Box 
            key={i}
            sx={{ 
              width: `${part.percentage}%`, 
              bgcolor: part.color, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              '&:hover': {
                opacity: 0.9,
                transform: 'scaleY(1.05)'
              }
            }}
          >
            <Typography 
              sx={{ 
                color: i === 0 ? 'navy.main' : 'common.white',
                fontWeight: 700, 
                fontSize: { xs: '1rem', md: '1.25rem' } 
              }}
            >
              {part.percentage}%
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Labels Row */}
      <Box sx={{ display: 'flex', mt: 1.5 }}>
        {validParts.map((part, i) => (
          <Box 
            key={i}
            sx={{ 
              width: `${part.percentage}%`, 
              textAlign: 'center', 
              px: 0.5 
            }}
          >
            <Typography 
              sx={{ 
                fontSize: { xs: '0.65rem', md: '0.8rem' },
                color: 'text.secondary',
                fontWeight: 500,
                lineHeight: 1.3
              }}
            >
              {part.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Booking Amount Card */}
      {bookingAmount && (
        <Box 
          sx={{ 
            mt: 2,
            p: 2,
            bgcolor: 'background.subtle',
            borderRadius: 2,
            border: '1px dashed',
            borderColor: 'gold.main',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: 'background.default',
              borderColor: 'gold.light'
            }
          }}
        >
          <Typography 
            sx={{ 
              fontSize: '0.85rem',
              color: 'text.secondary',
              textAlign: 'center'
            }}
          >
            {/* Booking Amount:{' '} */}
            Starting Price:{' '}
            <Box 
              component="span" 
              sx={{ 
                color: 'gold.main',
                fontWeight: 700,
                fontSize: '0.95rem'
              }}
            >
              AED {formatPrice(bookingAmount)}
            </Box>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProjectPaymentBar;