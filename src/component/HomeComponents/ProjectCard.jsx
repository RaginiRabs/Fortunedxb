import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Grid,
  IconButton,
} from '@mui/material';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Heart,
  Share2,
  Flame,
  Rocket,
  Timer,
  Verified,
  ArrowRight,
} from 'lucide-react';

const ProjectCard = ({ project, savedProperties, handleSaveProperty, handleInquiry }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'hot': return '#EF4444';
      case 'new': return '#10B981';
      case 'upcoming': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'hot': return 'Hot Selling';
      case 'new': return 'New Launch';
      case 'upcoming': return 'Upcoming';
      default: return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'hot': return <Flame size={14} />;
      case 'new': return <Rocket size={14} />;
      case 'upcoming': return <Timer size={14} />;
      default: return null;
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
          '& .project-image': {
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      {/* Image Section */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="240"
          image={project.image}
          alt={project.name}
          className="project-image"
          sx={{
            transition: 'transform 0.5s ease',
          }}
        />
        
        {/* Status Badge */}
        <Chip
          icon={getStatusIcon(project.status)}
          label={getStatusLabel(project.status)}
          size="small"
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            bgcolor: getStatusColor(project.status),
            color: 'white',
            fontWeight: 600,
          }}
        />

        {/* Action Buttons */}
        <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 1 }}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleSaveProperty(project.id);
            }}
            sx={{
              bgcolor: 'white',
              '&:hover': { bgcolor: 'white' },
            }}
          >
            <Heart
              size={18}
              fill={savedProperties.includes(project.id) ? '#EF4444' : 'none'}
              color={savedProperties.includes(project.id) ? '#EF4444' : '#1A1A2E'}
            />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              bgcolor: 'white',
              '&:hover': { bgcolor: 'white' },
            }}
          >
            <Share2 size={18} />
          </IconButton>
        </Box>

        {/* Developer Badge */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            bgcolor: 'rgba(255,255,255,0.95)',
            borderRadius: 2,
            px: 1.5,
            py: 0.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Verified size={14} color="#C6A962" />
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {project.developer}
          </Typography>
        </Box>
      </Box>

      {/* Content Section */}
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: 'secondary.main' }}>
          {project.name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
          <MapPin size={16} color="#C6A962" />
          <Typography variant="body2" color="text.secondary">
            {project.location}
          </Typography>
        </Box>

        {/* Property Details */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Bed size={16} color="#6B7280" />
            <Typography variant="body2" color="text.secondary">
              {project.beds} BR
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Bath size={16} color="#6B7280" />
            <Typography variant="body2" color="text.secondary">
              {project.baths} BA
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Maximize2 size={16} color="#6B7280" />
            <Typography variant="body2" color="text.secondary">
              {project.area} sqft
            </Typography>
          </Box>
        </Box>

        {/* Investment Info */}
        <Box
          sx={{
            bgcolor: 'rgba(198, 169, 98, 0.08)',
            borderRadius: 2,
            p: 2,
            mb: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">
                Expected ROI
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#10B981' }}>
                {project.roi}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">
                Payment Plan
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {project.paymentPlan}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">
                Completion
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {project.completion}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">
                Type
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {project.type}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Amenities */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 3 }}>
          {project.amenities.slice(0, 3).map((amenity, index) => (
            <Chip
              key={index}
              label={amenity}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.7rem' }}
            />
          ))}
          {project.amenities.length > 3 && (
            <Chip
              label={`+${project.amenities.length - 3}`}
              size="small"
              sx={{ bgcolor: 'primary.main', color: 'white', fontSize: '0.7rem' }}
            />
          )}
        </Box>

        {/* Price and CTA */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Starting From
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
              {project.price}
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={() => handleInquiry(project)}
            sx={{
              background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
              },
            }}
            endIcon={<ArrowRight size={18} />}
          >
            Inquire
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;