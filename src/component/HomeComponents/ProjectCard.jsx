import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Heart,
  ArrowRight,
  BadgeCheck,
} from 'lucide-react';

const ProjectCard = ({ project, savedProperties = [], handleSaveProperty, handleInquiry }) => {
  const getStatusStyle = (status) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('hot')) return { bg: '#C6A962', text: '#FFFFFF' };
    if (s.includes('new') || s.includes('launch')) return { bg: '#0B1A2A', text: '#FFFFFF' };
    if (s.includes('upcoming')) return { bg: '#64748B', text: '#FFFFFF' };
    if (s.includes('ready')) return { bg: '#10B981', text: '#FFFFFF' };
    return { bg: '#64748B', text: '#FFFFFF' };
  };

  const statusStyle = getStatusStyle(project?.status);
  const isSaved = savedProperties?.includes(project?.id);

  // Get remaining amenities for tooltip
  const visibleAmenities = project?.amenities?.slice(0, 3) || [];
  const hiddenAmenities = project?.amenities?.slice(3) || [];
  const hiddenAmenitiesText = hiddenAmenities.join(', ');

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 1.5,
        overflow: 'hidden',
        bgcolor: '#FFFFFF',
        border: '1px solid #F0F0F0',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 20px 40px rgba(11, 26, 42, 0.12), 0 0 0 1px rgba(198, 169, 98, 0.2)',
          '& .project-image': {
            transform: 'scale(1.05)',
          },
        },
      }}
      onClick={() => handleInquiry?.(project)}
    >
      {/* Image Section */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="180"
          image={project?.image}
          alt={project?.name}
          className="project-image"
          sx={{
            transition: 'transform 0.5s ease',
            objectFit: 'cover',
          }}
        />

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(11,26,42,0.05) 0%, rgba(11,26,42,0.5) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Status Badge - Top Left */}
        <Chip
          label={project?.status || 'Available'}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            bgcolor: statusStyle.bg,
            color: statusStyle.text,
            fontWeight: 700,
            fontSize: '0.58rem',
            height: 22,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            borderRadius: 1,
            fontFamily: '"Quicksand", sans-serif',
            fontStyle: 'italic',
            '& .MuiChip-label': {
              px: 1.25,
            },
          }}
        />

        {/* Heart Button - Top Right */}
        <Tooltip title={isSaved ? "Remove from saved" : "Save property"} arrow placement="left">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleSaveProperty?.(project?.id);
            }}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 32,
              height: 32,
              bgcolor: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(8px)',
              borderRadius: 1,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#FFFFFF',
                transform: 'scale(1.1)',
              },
            }}
          >
            <Heart
              size={16}
              fill={isSaved ? '#EF4444' : 'none'}
              color={isSaved ? '#EF4444' : '#0B1A2A'}
            />
          </IconButton>
        </Tooltip>

        {/* Price Badge - Bottom Left */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            bgcolor: 'rgba(11, 26, 42, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: 1,
            px: 1.5,
            py: 0.75,
            border: '1px solid rgba(198, 169, 98, 0.2)',
          }}
        >
          <Typography
            sx={{
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.95rem',
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
              lineHeight: 1,
            }}
          >
            <Box component="span" sx={{ color: '#C6A962', fontSize: '0.7rem', fontWeight: 600 }}>
              AED{' '}
            </Box>
            {project?.price}
          </Typography>
        </Box>

        {/* Developer Badge - Bottom Right */}
        <Tooltip title={`Developed by ${project?.developer}`} arrow placement="left">
          <Box
            sx={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              bgcolor: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(8px)',
              borderRadius: 1,
              px: 1.25,
              py: 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <BadgeCheck size={12} color="#C6A962" />
            <Typography
              sx={{
                fontSize: '0.62rem',
                fontWeight: 600,
                color: '#0B1A2A',
                maxWidth: 80,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
              }}
            >
              {project?.developer}
            </Typography>
          </Box>
        </Tooltip>
      </Box>

      {/* Content Section */}
      <CardContent sx={{ flexGrow: 1, p: 2, display: 'flex', flexDirection: 'column' }}>
        {/* Project Name */}
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '1rem',
            color: '#0B1A2A',
            fontFamily: '"Quicksand", sans-serif',
            fontStyle: 'italic',
            mb: 0.5,
            lineHeight: 1.25,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {project?.name}
        </Typography>

        {/* Location */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
          <MapPin size={13} color="#C6A962" />
          <Typography
            sx={{
              fontSize: '0.72rem',
              color: '#64748B',
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
            }}
          >
            {project?.location}
          </Typography>
        </Box>

        {/* Property Specs Row with Tooltips */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 1.5,
            pb: 1.5,
            borderBottom: '1px solid #F0F2F5',
          }}
        >
          <Tooltip title="Bedrooms" arrow>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'help' }}>
              <Bed size={13} color="#94A3B8" />
              <Typography
                sx={{
                  fontSize: '0.7rem',
                  color: '#64748B',
                  fontWeight: 500,
                  fontFamily: '"Quicksand", sans-serif',
                  fontStyle: 'italic',
                }}
              >
                {project?.beds} BR
              </Typography>
            </Box>
          </Tooltip>

          <Tooltip title="Bathrooms" arrow>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'help' }}>
              <Bath size={13} color="#94A3B8" />
              <Typography
                sx={{
                  fontSize: '0.7rem',
                  color: '#64748B',
                  fontWeight: 500,
                  fontFamily: '"Quicksand", sans-serif',
                  fontStyle: 'italic',
                }}
              >
                {project?.baths} BA
              </Typography>
            </Box>
          </Tooltip>

          <Tooltip title="Total Area" arrow>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'help' }}>
              <Maximize2 size={13} color="#94A3B8" />
              <Typography
                sx={{
                  fontSize: '0.7rem',
                  color: '#64748B',
                  fontWeight: 500,
                  fontFamily: '"Quicksand", sans-serif',
                  fontStyle: 'italic',
                }}
              >
                {project?.area} sqft
              </Typography>
            </Box>
          </Tooltip>
        </Box>

        {/* Amenities with Tooltip for More */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 'auto',
        }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {visibleAmenities.map((amenity, index) => (
              <Chip
                key={index}
                label={amenity}
                size="small"
                sx={{
                  height: 22,
                  fontSize: '0.6rem',
                  bgcolor: 'rgba(198, 169, 98, 0.08)',
                  border: '1px solid rgba(198, 169, 98, 0.15)',
                  color: '#64748B',
                  borderRadius: 1,
                  fontFamily: '"Quicksand", sans-serif',
                  fontStyle: 'italic',
                  '& .MuiChip-label': {
                    px: 1,
                  },
                }}
              />
            ))}
            {hiddenAmenities.length > 0 && (
              <Tooltip
                title={
                  <Box sx={{ p: 0.5 }}>
                    <Typography
                      sx={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        mb: 0.5,
                        fontFamily: '"Quicksand", sans-serif',
                        fontStyle: 'italic',
                      }}
                    >
                      More Amenities:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.65rem',
                        fontFamily: '"Quicksand", sans-serif',
                        fontStyle: 'italic',
                      }}
                    >
                      {hiddenAmenitiesText}
                    </Typography>
                  </Box>
                }
                arrow
                placement="top"
              >
                <Chip
                  label={`+${hiddenAmenities.length} more`}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: '0.6rem',
                    bgcolor: 'rgba(198, 169, 98, 0.15)',
                    color: '#C6A962',
                    fontWeight: 600,
                    borderRadius: 1,
                    cursor: 'help',
                    transition: 'all 0.3s ease',
                    fontFamily: '"Quicksand", sans-serif',
                    fontStyle: 'italic',
                    '&:hover': {
                      bgcolor: 'rgba(198, 169, 98, 0.25)',
                    },
                    '& .MuiChip-label': {
                      px: 1,
                    },
                  }}
                />
              </Tooltip>
            )}

          </Box>

          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1,
              background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              '.MuiCard-root:hover &': {
                transform: 'scale(1.1)',
                boxShadow: '0 4px 12px rgba(198, 169, 98, 0.4)',
              },
            }}
          >
            <ArrowRight size={16} color="#FFFFFF" />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;