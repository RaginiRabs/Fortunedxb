'use client';
import { Box, Typography, Paper, Button, Grid, Tooltip, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { MapPin, Navigation } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic import for map component
const LocationMap = dynamic(() => import('@/components/LocationMap/LocationMap'), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        height: '100%',
        minHeight: { xs: 250, md: 400 },
        bgcolor: 'grey.100',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2
      }}
    >
      <Typography sx={{ color: 'text.secondary' }}>Loading map...</Typography>
    </Box>
  )
});

const ProjectLocationMap = ({
  nearbyLocations = [],
  locationLink,
  location,
  projectName,
  locationIframe
}) => {
  const theme = useTheme();

  const hasValidIframe = locationIframe && locationIframe.trim().length > 0;
  const hasNearbyLocations = nearbyLocations.length > 0;

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
        Location
      </Typography>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Grid container>
          {/* Nearby Locations List - Left Side (only when there are nearby places) */}
          {hasNearbyLocations && (
          <Grid size={{ xs: 12, md: 4}}  sx={{ order: { xs: 2, md: 1 } }}>
            <Box sx={{ bgcolor: 'background.paper', height: '100%' }}>
              {nearbyLocations.length > 0 ? (
                <Box
                  sx={{
                    maxHeight: { xs: 'auto', md: 400 },
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                      width: '6px'
                    },
                    '&::-webkit-scrollbar-track': {
                      bgcolor: 'grey.100'
                    },
                    '&::-webkit-scrollbar-thumb': {
                      bgcolor: 'grey.300',
                      borderRadius: '3px'
                    }
                  }}
                >
                  {nearbyLocations.map((place, i) => (
                    <Tooltip
                      key={i}
                      title={
                        <Box>
                          <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, mb: 0.5 }}>
                            {place.place_name}
                          </Typography>
                          <Typography sx={{ fontSize: '0.7rem', color: 'grey.300' }}>
                            {place.distance_value} {place.distance_unit} away
                          </Typography>
                          {place.category && (
                            <Typography sx={{ fontSize: '0.65rem', color: 'text.disabled', mt: 0.25 }}>
                              Category: {place.category}
                            </Typography>
                          )}
                        </Box>
                      }
                      arrow
                      placement="right"
                      enterDelay={300}
                      sx={{
                        '& .MuiTooltip-tooltip': {
                          bgcolor: 'navy.main',
                          borderRadius: 1.5,
                          px: 1.5,
                          py: 1
                        },
                        '& .MuiTooltip-arrow': {
                          color: 'navy.main'
                        }
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          px: 2,
                          py: 1.75,
                          borderBottom: '1px solid',
                          borderBottomColor: 'grey.100',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'background.subtle'
                          }
                        }}
                      >
                        {/* Left Side: Number + Name */}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            flex: 1,
                            minWidth: 0
                          }}
                        >
                          {/* Number Badge */}
                          <Box
                            sx={{
                              minWidth: 24,
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              bgcolor: 'navy.main',
                              color: 'common.white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '0.7rem'
                            }}
                          >
                            {i + 1}
                          </Box>

                          {/* Place Name */}
                          <Typography
                            sx={{
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              color: 'text.primary',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {place.place_name}
                          </Typography>
                        </Box>

                        {/* Distance */}
                        <Typography
                          sx={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            color: 'text.disabled',
                            whiteSpace: 'nowrap',
                            ml: 1
                          }}
                        >
                          {place.distance_value} {place.distance_unit}
                        </Typography>
                      </Box>
                    </Tooltip>
                  ))}
                </Box>
              ) : (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <MapPin size={40} color={theme.palette.divider} />
                  <Typography sx={{ color: 'text.disabled', mt: 2, fontSize: '0.85rem' }}>
                    Nearby locations coming soon
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
          )}

          {/* Map - Right Side (full width when no nearby list) */}
          <Grid size={{ xs: 12, md: hasNearbyLocations ? 8 : 12 }}  sx={{ order: { xs: 1, md: 2 } }}>
            <Box
              sx={{
                position: 'relative',
                height: { xs: 250, md: '100%' },
                minHeight: { md: 400 },
                bgcolor: 'grey.100'
              }}
            >
              {hasValidIframe ? (
                <LocationMap
                  locationLink={locationIframe}
                  projectName={projectName}
                  height="100%"
                />
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'grey.100'
                  }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <MapPin size={48} color={theme.palette.grey[300]} />
                    <Typography
                      sx={{
                        fontSize: '0.85rem',
                        color: 'text.secondary',
                        mt: 2,
                        fontWeight: 600
                      }}
                    >
                      Location map not available
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        color: 'text.disabled',
                        mt: 0.5
                      }}
                    >
                      Click "Get Directions" below to view on Google Maps
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* View Full Map Button */}
              {hasValidIframe && (
                <Tooltip
                  title="Open in Google Maps"
                  arrow
                  placement="left"
                >
                  <Button
                    variant="contained"
                    startIcon={<MapPin size={14} />}
                    href={locationLink || `https://www.google.com/maps/search/${encodeURIComponent(location)}`}
                    target="_blank"
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      right: 16,
                      bgcolor: alpha(theme.palette.common.white, 0.95),
                      color: 'navy.main',
                      fontWeight: 600,
                      borderRadius: 2,
                      px: 2,
                      py: 0.75,
                      fontSize: '0.75rem',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
                      zIndex: 1000,
                      '&:hover': {
                        bgcolor: 'common.white'
                      }
                    }}
                  >
                    View Full Map
                  </Button>
                </Tooltip>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Get Directions Button - Bottom */}
        <Box
          sx={{
            p: 2,
            bgcolor: 'background.subtle',
            borderTop: '1px solid',
            borderTopColor: 'divider'
          }}
        >
          <Tooltip
            title={`Get directions to ${projectName}`}
            arrow
            placement="top"
          >
            <Button
              fullWidth
              variant="contained"
              startIcon={<Navigation size={16} />}
              href={locationLink || `https://www.google.com/maps/search/${encodeURIComponent(location)}`}
              target="_blank"
              sx={{
                bgcolor: 'navy.main',
                color: 'common.white',
                py: 1.25,
                fontWeight: 700,
                borderRadius: 2,
                fontSize: '0.85rem',
                '&:hover': {
                  bgcolor: 'navy.light'
                }
              }}
            >
              Get Directions
            </Button>
          </Tooltip>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProjectLocationMap;
