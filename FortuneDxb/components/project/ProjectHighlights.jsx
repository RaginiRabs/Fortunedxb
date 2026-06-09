'use client';
import { Box, Typography, Chip, useTheme } from '@mui/material';
import { CheckCircle2 } from 'lucide-react';

const ProjectHighlights = ({
  highlights = [],
  bedsRange,
  paymentPlan,
  roi,
  handoverDate,
  totalUnits,
  furnishingStatus,
  formatDate,
}) => {
  const theme = useTheme();

  // Default highlights if none provided
  const defaultHighlights = [
    bedsRange,
    `${paymentPlan} Payment Plan`,
    roi ? `ROI: ${roi}%` : null,
    `Handover: ${formatDate(handoverDate)}`,
    totalUnits ? `${totalUnits} Units` : null,
    furnishingStatus
  ].filter(Boolean);

  const displayHighlights = highlights.length > 0 ? highlights : defaultHighlights;

  if (displayHighlights.length === 0) return null;

  return (
    <Box sx={{ mb: 5 }}>
      <Typography
        sx={{
          fontSize: '0.8rem',
          fontWeight: 700,
          color: 'text.primary',
          mb: 1.5,
          textTransform: 'uppercase',
          letterSpacing: 0.5
        }}
      >
        Key Highlights
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {displayHighlights.map((highlight, i) => (
          <Chip
            key={i}
            icon={<CheckCircle2 size={14} color={theme.palette.gold.main} />}
            label={highlight}
            sx={{
              bgcolor: 'background.subtle',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1.5,
              height: 32,
              fontSize: '0.8rem',
              fontWeight: 500,
              color: 'text.primary',
              '&:hover': {
                borderColor: 'gold.main',
                bgcolor: 'background.hover'
              },
              '& .MuiChip-icon': { ml: 0.5, mr: -0.5 },
              '& .MuiChip-label': { px: 1.5 },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProjectHighlights;
