'use client';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { BedDouble } from 'lucide-react';

// Shared 3-column track: Type | Size | Starting Price
const COLS = { xs: '1fr 1fr', md: '1.5fr 1fr 1.3fr' };

const ProjectUnitsTable = ({
  configurations = [],
  formatConfigArea,
  formatConfigPrice
}) => {
  const theme = useTheme();

  if (!configurations || configurations.length === 0) return null;

  return (
    <Box sx={{ mb: 5 }}>
      {/* Section Title */}
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '1.1rem', md: '1.25rem' },
          fontWeight: 700,
          color: 'text.primary',
          mb: 2
        }}
      >
        Available Units
      </Typography>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 2.5,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden'
        }}
      >
        {/* Header Row — desktop only */}
        <Box
          sx={{
            display: { xs: 'none', md: 'grid' },
            gridTemplateColumns: COLS.md,
            alignItems: 'center',
            gap: 2,
            px: 2.5,
            py: 1.5,
            bgcolor: 'background.subtle',
            borderBottom: '2px solid',
            borderColor: 'gold.main'
          }}
        >
          {['Type', 'Size', 'Starting Price'].map((label, idx) => (
            <Typography
              key={idx}
              sx={{
                fontSize: '0.68rem',
                fontWeight: 800,
                letterSpacing: 0.6,
                textTransform: 'uppercase',
                color: 'text.secondary'
              }}
            >
              {label}
            </Typography>
          ))}
        </Box>

        {/* Unit Rows */}
        {configurations.map((config, i) => {
          const isLast = i === configurations.length - 1;

          return (
            <Box
              key={i}
              sx={{
                display: 'grid',
                gridTemplateColumns: COLS,
                alignItems: 'center',
                columnGap: 2,
                rowGap: 1,
                px: { xs: 2, md: 2.5 },
                py: 2,
                borderBottom: isLast ? 'none' : '1px solid',
                borderColor: 'divider',
                transition: 'background-color 0.25s ease',
                '&:hover': { bgcolor: 'background.subtle' }
              }}
            >
              {/* Type */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1.5,
                    display: { xs: 'none', sm: 'flex' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'gold.pale',
                    flexShrink: 0
                  }}
                >
                  <BedDouble size={16} color={theme.palette.gold.main} />
                </Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    fontSize: '0.9rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {config.type}
                </Typography>
              </Box>

              {/* Size */}
              <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary', fontWeight: 500 }}>
                {formatConfigArea(config) || 'On request'}
              </Typography>

              {/* Starting Price + units left */}
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontWeight: 600, color: 'gold.main', fontSize: '1rem', lineHeight: 1.2 }}>
                  {formatConfigPrice(config) || 'On Request'}
                </Typography>
                {config.units_available && (
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-block',
                      mt: 0.5,
                      px: 1,
                      py: 0.25,
                      borderRadius: 1,
                      bgcolor: 'success.main',
                      color: 'common.white',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      letterSpacing: 0.3
                    }}
                  >
                    {config.units_available} units left
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
      </Paper>
    </Box>
  );
};

export default ProjectUnitsTable;
