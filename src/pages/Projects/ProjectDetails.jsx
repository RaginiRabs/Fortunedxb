import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Chip,
  IconButton,
  Avatar,
  Paper,
  Divider,
  TextField,
  useMediaQuery,
  useTheme,
  Breadcrumbs,
  Link,
  Tooltip,
  Dialog,
  DialogContent,
  Fab,
  Slide,
  Fade,
} from '@mui/material';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Building2,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Download,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  Play,
  X,
  Home,
  Navigation,
  Clock,
  TrendingUp,
  Shield,
  Award,
  Percent,
  BadgeCheck,
  Car,
  Dumbbell,
  Waves,
  TreePine,
  ShoppingBag,
  GraduationCap,
  Stethoscope,
  Utensils,
  Wifi,
  Lock,
  Sun,
  Wind,
  Video,
  Image,
  ArrowUpRight,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

// Amenity icon mapping
const amenityIcons = {
  'Swimming Pool': Waves,
  'Gym': Dumbbell,
  'Parking': Car,
  'Garden': TreePine,
  'Security': Lock,
  'Retail': ShoppingBag,
  'Schools': GraduationCap,
  'Hospital': Stethoscope,
  'Restaurants': Utensils,
  'WiFi': Wifi,
  'Balcony': Sun,
  'AC': Wind,
  'Default': CheckCircle2,
};

// Lead Capture Popup Component
const LeadPopup = ({ open, onClose, projectName }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: 'hidden',
          m: 2,
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: 'rgba(0,0,0,0.05)',
            zIndex: 10,
          }}
        >
          <X size={20} />
        </IconButton>

        <Grid container>
          {/* Left Side - Image */}
          <Grid size={{xs:12, md:5}} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box
              sx={{
                height: '100%',
                minHeight: 400,
                backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=800&fit=crop)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(11,26,42,0.3) 0%, rgba(11,26,42,0.8) 100%)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 24,
                  left: 24,
                  right: 24,
                  
                }}
              >
                <Typography sx={{ color: '#C6A962', fontSize: '0.75rem', fontWeight: 600, mb: 0.5 }}>
                  LIMITED TIME OFFER
                </Typography>
                <Typography sx={{ color: '#FFFFFF', fontSize: '1.25rem', fontWeight: 700 }}>
                  Get Exclusive Pricing & Floor Plans
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Side - Form */}
          <Grid size={{xs:12, md: 7,}}>
            <Box sx={{ p: { xs: 3, md: 4 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Sparkles size={20} color="#C6A962" />
                <Typography sx={{ color: '#C6A962', fontSize: '0.75rem', fontWeight: 600, letterSpacing: 1 }}>
                  REGISTER YOUR INTEREST
                </Typography>
              </Box>
              
              <Typography
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#0B1A2A',
                  mb: 0.5,
                  fontFamily: '"Quicksand", sans-serif',
                }}
              >
                {projectName}
              </Typography>
              <Typography sx={{ fontSize: '0.85rem', color: '#64748B', mb: 3 }}>
                Fill in your details and our property consultant will contact you within 24 hours.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Your Name *"
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      bgcolor: '#F8FAFC',
                      '& fieldset': { borderColor: '#E5E7EB' },
                      '&:hover fieldset': { borderColor: '#C6A962' },
                      '&.Mui-focused fieldset': { borderColor: '#C6A962' },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  placeholder="Email Address *"
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      bgcolor: '#F8FAFC',
                      '& fieldset': { borderColor: '#E5E7EB' },
                      '&:hover fieldset': { borderColor: '#C6A962' },
                      '&.Mui-focused fieldset': { borderColor: '#C6A962' },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  placeholder="Phone Number *"
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      bgcolor: '#F8FAFC',
                      '& fieldset': { borderColor: '#E5E7EB' },
                      '&:hover fieldset': { borderColor: '#C6A962' },
                      '&.Mui-focused fieldset': { borderColor: '#C6A962' },
                    },
                  }}
                />
                
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: '#C6A962',
                    color: '#FFFFFF',
                    py: 1.5,
                    fontWeight: 700,
                    borderRadius: 1.5,
                    fontSize: '0.9rem',
                    '&:hover': { bgcolor: '#A68B4B' },
                  }}
                >
                  Get Exclusive Offer
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<MessageCircle size={18} />}
                  sx={{
                    borderColor: '#25D366',
                    color: '#25D366',
                    py: 1.25,
                    fontWeight: 600,
                    borderRadius: 1.5,
                    '&:hover': { bgcolor: 'rgba(37, 211, 102, 0.05)' },
                  }}
                >
                  Chat on WhatsApp
                </Button>
              </Box>

              <Typography sx={{ fontSize: '0.7rem', color: '#94A3B8', textAlign: 'center', mt: 2 }}>
                By submitting, you agree to our Privacy Policy
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

// Mobile Sticky CTA Component
const MobileStickyCTA = ({ onInquiryClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!isMobile) return null;

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        p: 2,
        borderRadius: '16px 16px 0 0',
        bgcolor: '#FFFFFF',
        borderTop: '1px solid #E5E7EB',
      }}
    >
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<Phone size={18} />}
          sx={{
            bgcolor: '#0B1A2A',
            color: '#FFFFFF',
            py: 1.25,
            fontWeight: 600,
            borderRadius: 1.5,
            '&:hover': { bgcolor: '#1E3A5F' },
          }}
        >
          Call Now
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={onInquiryClick}
          sx={{
            bgcolor: '#C6A962',
            color: '#FFFFFF',
            py: 1.25,
            fontWeight: 600,
            borderRadius: 1.5,
            '&:hover': { bgcolor: '#A68B4B' },
          }}
        >
          Get Price
        </Button>
      </Box>
    </Paper>
  );
};

const ProjectDetails = () => {
  const { developerSlug, projectSlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [isSaved, setIsSaved] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showLeadPopup, setShowLeadPopup] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Show popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLeadPopup(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Sample project data - Replace with API call
  const project = {
    id: 1,
    name: 'The Heights Country Club',
    developer: 'Emaar Properties',
    developerLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    location: 'Dubai Hills Estate',
    city: 'Dubai',
    status: 'New Launch',
    price: '2.5M',
    priceRange: 'AED 2.5M - 8.5M',
    handover: 'Q4 2027',
    propertyType: 'Apartments & Townhouses',
    beds: '1-4',
    baths: '1-5',
    area: '750 - 3,500',
    description: `The Heights Country Club is an exclusive residential development by Emaar Properties, offering a premium lifestyle in the heart of Dubai Hills Estate. This prestigious project features elegantly designed apartments and townhouses with stunning views of the championship golf course and Dubai skyline.

Residents will enjoy world-class amenities including a private country club, infinity pools, state-of-the-art fitness center, and beautifully landscaped gardens.`,
    highlights: [
      'Direct golf course views',
      'Private country club access',
      'Smart home technology',
      'Premium Italian finishes',
      '5-year post-handover plan',
      'Golden Visa eligible',
    ],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    amenities: [
      'Swimming Pool', 'Gym', 'Parking', 'Garden', 'Security',
      'Retail', 'Schools', 'Restaurants', 'WiFi', 'Balcony', 'AC'
    ],
    paymentPlan: [
      { milestone: 'Booking', percentage: 10, description: 'On reservation' },
      { milestone: 'Construction', percentage: 50, description: 'During construction' },
      { milestone: 'Handover', percentage: 40, description: 'On completion' },
    ],
    unitTypes: [
      { type: '1 Bedroom', area: '750 - 900 sqft', price: 'AED 2.5M', available: 15 },
      { type: '2 Bedroom', area: '1,100 - 1,400 sqft', price: 'AED 3.8M', available: 22 },
      { type: '3 Bedroom', area: '1,800 - 2,200 sqft', price: 'AED 5.5M', available: 12 },
      { type: '4 BR Townhouse', area: '2,800 - 3,500 sqft', price: 'AED 8.5M', available: 8 },
    ],
    nearbyPlaces: [
      { name: 'Dubai Mall', distance: '10 min', icon: ShoppingBag },
      { name: 'DXB Airport', distance: '20 min', icon: Navigation },
      { name: 'Downtown', distance: '12 min', icon: Building2 },
      { name: 'Business Bay', distance: '8 min', icon: Building2 },
    ],
    developerInfo: {
      name: 'Emaar Properties',
      established: '1997',
      projects: '60+',
      description: 'Emaar Properties is one of the world\'s most valuable real estate companies with proven expertise in properties, shopping malls, retail, and hospitality.',
    },
  };

  const getStatusStyle = (status) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('new') || s.includes('launch')) return { bg: '#C6A962', text: '#FFFFFF' };
    if (s.includes('ready')) return { bg: '#10B981', text: '#FFFFFF' };
    return { bg: '#0B1A2A', text: '#FFFFFF' };
  };

  const statusStyle = getStatusStyle(project.status);

  return (
    <Box sx={{ bgcolor: '#FFFFFF', minHeight: '100vh', pb: { xs: 10, md: 0 }, mt: 10 }}>
      {/* Lead Popup */}
      <LeadPopup
        open={showLeadPopup}
        onClose={() => setShowLeadPopup(false)}
        projectName={project.name}
      />

      {/* Mobile Sticky CTA */}
      <MobileStickyCTA onInquiryClick={() => setShowLeadPopup(true)} />

      {/* Breadcrumbs - Light Style */}
      <Box sx={{ bgcolor: '#F8FAFC', py: 1.5, borderBottom: '1px solid #E5E7EB' }}>
        <Container maxWidth="lg">
          <Breadcrumbs
            separator="›"
            sx={{ '& .MuiBreadcrumbs-separator': { color: '#94A3B8' } }}
          >
            <Link
              href="/home"
              sx={{
                color: '#64748B',
                textDecoration: 'none',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                '&:hover': { color: '#C6A962' },
              }}
            >
              <Home size={14} /> Home
            </Link>
            <Link
              href="/projects"
              sx={{
                color: '#64748B',
                textDecoration: 'none',
                fontSize: '0.8rem',
                '&:hover': { color: '#C6A962' },
              }}
            >
              Projects
            </Link>
            <Typography sx={{ color: '#0B1A2A', fontSize: '0.8rem', fontWeight: 500 }}>
              {project.name}
            </Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      {/* BENTO GRID IMAGE GALLERY */}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container spacing={1.5}>
          {/* Main Large Image */}
          <Grid size={{xs:12, md:7}}>
            <Box
              onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
              sx={{
                position: 'relative',
                height: { xs: 250, sm: 350, md: 420 },
                borderRadius: 3,
                overflow: 'hidden',
                cursor: 'pointer',
                '&:hover img': { transform: 'scale(1.03)' },
              }}
            >
              <Box
                component="img"
                src={project.images[0]}
                alt={project.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
              />
              {/* Status Badge */}
              <Chip
                label={project.status}
                sx={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  bgcolor: statusStyle.bg,
                  color: statusStyle.text,
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  height: 28,
                }}
              />
              {/* Action Buttons */}
              <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 1 }}>
                <IconButton
                  onClick={(e) => { e.stopPropagation(); setIsSaved(!isSaved); }}
                  sx={{ bgcolor: '#FFFFFF', '&:hover': { bgcolor: '#FFFFFF' } }}
                >
                  <Heart size={18} fill={isSaved ? '#EF4444' : 'none'} color={isSaved ? '#EF4444' : '#0B1A2A'} />
                </IconButton>
                <IconButton sx={{ bgcolor: '#FFFFFF', '&:hover': { bgcolor: '#FFFFFF' } }}>
                  <Share2 size={18} color="#0B1A2A" />
                </IconButton>
              </Box>
              {/* View All Button */}
              <Button
                startIcon={<Image size={16} />}
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  bgcolor: 'rgba(255,255,255,0.95)',
                  color: '#0B1A2A',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  borderRadius: 2,
                  px: 2,
                  '&:hover': { bgcolor: '#FFFFFF' },
                }}
              >
                {project.images.length} Photos
              </Button>
            </Box>
          </Grid>

          {/* Small Images Grid */}
          <Grid size={{xs:12, md:5}}>
            <Grid container spacing={1.5} sx={{ height: '100%' }}>
              {project.images.slice(1, 5).map((img, i) => (
                <Grid size={{xs:6}} key={i}>
                  <Box
                    onClick={() => { setLightboxIndex(i + 1); setLightboxOpen(true); }}
                    sx={{
                      position: 'relative',
                      height: { xs: 120, md: 202 },
                      borderRadius: 2,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      '&:hover img': { transform: 'scale(1.05)' },
                    }}
                  >
                    <Box
                      component="img"
                      src={img}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                    />
                    {/* Video Overlay on last image */}
                    {i === 3 && (
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          bgcolor: 'rgba(11,26,42,0.6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          gap: 0.5,
                        }}
                      >
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            bgcolor: '#C6A962',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Play size={24} color="#FFFFFF" fill="#FFFFFF" />
                        </Box>
                        <Typography sx={{ color: '#FFFFFF', fontSize: '0.75rem', fontWeight: 600 }}>
                          Watch Video
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* PROJECT INFO HEADER */}
      <Box sx={{ bgcolor: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Grid container spacing={3} alignItems="flex-start">
            {/* Left - Project Info */}
            <Grid size={{xs:12, md: 8}}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <Avatar
                  src={project.developerLogo}
                  sx={{ width: 40, height: 40, border: '2px solid #E5E7EB' }}
                />
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography sx={{ fontSize: '0.8rem', color: '#64748B' }}>
                      by {project.developer}
                    </Typography>
                    <BadgeCheck size={14} color="#C6A962" />
                  </Box>
                </Box>
              </Box>

              <Typography
                sx={{
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 700,
                  color: '#0B1A2A',
                  fontFamily: '"Quicksand", sans-serif',
                  mb: 1,
                }}
              >
                {project.name}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                <MapPin size={16} color="#C6A962" />
                <Typography sx={{ color: '#64748B', fontSize: '0.9rem' }}>
                  {project.location}, {project.city}
                </Typography>
              </Box>

              {/* Quick Stats */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {[
                  { icon: Bed, label: 'Bedrooms', value: project.beds },
                  { icon: Maximize2, label: 'Size', value: `${project.area} sqft` },
                  { icon: Calendar, label: 'Handover', value: project.handover },
                  { icon: Building2, label: 'Type', value: project.propertyType },
                ].map((stat, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 1.5,
                        bgcolor: '#F8FAFC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <stat.icon size={18} color="#C6A962" />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '0.65rem', color: '#94A3B8', textTransform: 'uppercase' }}>
                        {stat.label}
                      </Typography>
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#0B1A2A' }}>
                        {stat.value}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Right - Price & CTA */}
            <Grid size={{xs:12, md:4}}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '2px solid #C6A962',
                  bgcolor: '#FFFDF8',
                }}
              >
                <Typography sx={{ fontSize: '0.75rem', color: '#64748B', mb: 0.5 }}>
                  Starting Price
                </Typography>
                <Typography
                  sx={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: '#0B1A2A',
                    fontFamily: '"Quicksand", sans-serif',
                    mb: 2,
                  }}
                >
                  <Box component="span" sx={{ color: '#C6A962', fontSize: '1rem' }}>AED </Box>
                  {project.price}
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setShowLeadPopup(true)}
                  sx={{
                    bgcolor: '#C6A962',
                    color: '#FFFFFF',
                    py: 1.5,
                    fontWeight: 700,
                    borderRadius: 2,
                    mb: 1.5,
                    '&:hover': { bgcolor: '#A68B4B' },
                  }}
                >
                  Request Price List
                </Button>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Phone size={16} />}
                    sx={{
                      borderColor: '#0B1A2A',
                      color: '#0B1A2A',
                      fontWeight: 600,
                      borderRadius: 2,
                      '&:hover': { bgcolor: '#0B1A2A', color: '#FFFFFF' },
                    }}
                  >
                    Call
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<MessageCircle size={16} />}
                    sx={{
                      borderColor: '#25D366',
                      color: '#25D366',
                      fontWeight: 600,
                      borderRadius: 2,
                      '&:hover': { bgcolor: '#25D366', color: '#FFFFFF' },
                    }}
                  >
                    WhatsApp
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* MAIN CONTENT */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid size={{xs:12, md:8 }}>
            {/* About */}
            <Box sx={{ mb: 5 }}>
              <Typography
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#0B1A2A',
                  mb: 2,
                  fontFamily: '"Quicksand", sans-serif',
                }}
              >
                About {project.name}
              </Typography>
              <Typography sx={{ color: '#64748B', lineHeight: 1.8, fontSize: '0.95rem', mb: 3 }}>
                {project.description}
              </Typography>

              {/* Highlights */}
              <Grid container spacing={1.5}>
                {project.highlights.map((h, i) => (
                  <Grid size={{xs:12, sm:6 }} key={i}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        p: 1.5,
                        bgcolor: '#F8FAFC',
                        borderRadius: 2,
                      }}
                    >
                      <CheckCircle2 size={18} color="#C6A962" />
                      <Typography sx={{ fontSize: '0.9rem', color: '#334155' }}>{h}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Video Section */}
            <Box sx={{ mb: 5 }}>
              <Typography
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#0B1A2A',
                  mb: 2,
                  fontFamily: '"Quicksand", sans-serif',
                }}
              >
                Project Video Tour
              </Typography>
              <Box
                sx={{
                  position: 'relative',
                  paddingTop: '56.25%',
                  borderRadius: 3,
                  overflow: 'hidden',
                  bgcolor: '#0B1A2A',
                }}
              >
                {!videoPlaying ? (
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${project.images[0]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => setVideoPlaying(true)}
                  >
                    <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(11,26,42,0.5)' }} />
                    <Box
                      sx={{
                        position: 'relative',
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: '#C6A962',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.3s',
                        '&:hover': { transform: 'scale(1.1)' },
                      }}
                    >
                      <Play size={36} color="#FFFFFF" fill="#FFFFFF" />
                    </Box>
                  </Box>
                ) : (
                  <iframe
                    src={`${project.videoUrl}?autoplay=1`}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                    }}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                )}
              </Box>
            </Box>

            {/* Unit Types */}
            <Box sx={{ mb: 5 }}>
              <Typography
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#0B1A2A',
                  mb: 2,
                  fontFamily: '"Quicksand", sans-serif',
                }}
              >
                Available Units
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {project.unitTypes.map((unit, i) => (
                  <Paper
                    key={i}
                    elevation={0}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2.5,
                      borderRadius: 2,
                      border: '1px solid #E5E7EB',
                      flexWrap: 'wrap',
                      gap: 2,
                      transition: 'all 0.3s',
                      '&:hover': {
                        borderColor: '#C6A962',
                        bgcolor: '#FFFDF8',
                      },
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 600, color: '#0B1A2A', mb: 0.25 }}>
                        {unit.type}
                      </Typography>
                      <Typography sx={{ fontSize: '0.8rem', color: '#64748B' }}>
                        {unit.area}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: { xs: 'left', sm: 'center' } }}>
                      <Typography sx={{ fontWeight: 700, color: '#C6A962', fontSize: '1.1rem' }}>
                        {unit.price}
                      </Typography>
                      <Typography sx={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                        {unit.available} units left
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      endIcon={<ArrowUpRight size={14} />}
                      onClick={() => setShowLeadPopup(true)}
                      sx={{
                        borderColor: '#C6A962',
                        color: '#C6A962',
                        borderRadius: 2,
                        fontWeight: 600,
                        '&:hover': { bgcolor: '#C6A962', color: '#FFFFFF' },
                      }}
                    >
                      View Plan
                    </Button>
                  </Paper>
                ))}
              </Box>
            </Box>

            {/* Payment Plan */}
            <Box sx={{ mb: 5 }}>
              <Typography
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#0B1A2A',
                  mb: 2,
                  fontFamily: '"Quicksand", sans-serif',
                }}
              >
                Payment Plan
              </Typography>
              <Grid container spacing={2}>
                {project.paymentPlan.map((plan, i) => (
                  <Grid size={{xs:12, sm:4 }} key={i}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        bgcolor: i === 0 ? '#0B1A2A' : '#F8FAFC',
                        border: i === 0 ? 'none' : '1px solid #E5E7EB',
                        textAlign: 'center',
                        height: '100%',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '2.5rem',
                          fontWeight: 700,
                          color: i === 0 ? '#C6A962' : '#C6A962',
                          fontFamily: '"Quicksand", sans-serif',
                          lineHeight: 1,
                        }}
                      >
                        {plan.percentage}%
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          color: i === 0 ? '#FFFFFF' : '#0B1A2A',
                          mt: 1,
                        }}
                      >
                        {plan.milestone}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.75rem',
                          color: i === 0 ? 'rgba(255,255,255,0.7)' : '#64748B',
                          mt: 0.5,
                        }}
                      >
                        {plan.description}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Amenities */}
            <Box sx={{ mb: 5 }}>
              <Typography
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#0B1A2A',
                  mb: 2,
                  fontFamily: '"Quicksand", sans-serif',
                }}
              >
                Amenities & Features
              </Typography>
              <Grid container spacing={1.5}>
                {project.amenities.map((amenity, i) => {
                  const IconComponent = amenityIcons[amenity] || amenityIcons['Default'];
                  return (
                    <Grid size={{xs:6, sm:4 , md : 3}} key={i}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          p: 2,
                          borderRadius: 2,
                          bgcolor: '#F8FAFC',
                          border: '1px solid #E5E7EB',
                          transition: 'all 0.3s',
                          '&:hover': { borderColor: '#C6A962' },
                        }}
                      >
                        <IconComponent size={20} color="#C6A962" />
                        <Typography sx={{ fontSize: '0.85rem', color: '#334155', fontWeight: 500 }}>
                          {amenity}
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>

            {/* Location */}
            <Box sx={{ mb: 5 }}>
              <Typography
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#0B1A2A',
                  mb: 2,
                  fontFamily: '"Quicksand", sans-serif',
                }}
              >
                Location & Connectivity
              </Typography>
              <Box
                sx={{
                  height: 280,
                  borderRadius: 3,
                  overflow: 'hidden',
                  mb: 3,
                  position: 'relative',
                  backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=400&fit=crop)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(11,26,42,0.3)' }} />
                <Button
                  variant="contained"
                  startIcon={<MapPin size={18} />}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: '#FFFFFF',
                    color: '#0B1A2A',
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 3,
                    '&:hover': { bgcolor: '#F8FAFC' },
                  }}
                >
                  View on Google Maps
                </Button>
              </Box>
              <Grid container spacing={2}>
                {project.nearbyPlaces.map((place, i) => (
                  <Grid size={{xs:6, sm: 3,}} key={i}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: '#F8FAFC',
                        textAlign: 'center',
                        border: '1px solid #E5E7EB',
                      }}
                    >
                      <place.icon size={24} color="#C6A962" style={{ marginBottom: 8 }} />
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#0B1A2A', mb: 0.25 }}>
                        {place.name}
                      </Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: '#64748B' }}>
                        {place.distance}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Developer Info */}
            <Box>
              <Typography
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#0B1A2A',
                  mb: 2,
                  fontFamily: '"Quicksand", sans-serif',
                }}
              >
                About Developer
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid #E5E7EB',
                }}
              >
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
                  <Avatar
                    src={project.developerLogo}
                    sx={{ width: 70, height: 70, border: '2px solid #C6A962' }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#0B1A2A' }}>
                        {project.developerInfo.name}
                      </Typography>
                      <BadgeCheck size={18} color="#C6A962" />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 3, mb: 1.5 }}>
                      <Chip label={`Est. ${project.developerInfo.established}`} size="small" sx={{ bgcolor: '#F8FAFC' }} />
                      <Chip label={`${project.developerInfo.projects} Projects`} size="small" sx={{ bgcolor: '#F8FAFC' }} />
                    </Box>
                    <Typography sx={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.7 }}>
                      {project.developerInfo.description}
                    </Typography>
                    <Button
                      variant="text"
                      endIcon={<ArrowRight size={16} />}
                      sx={{ color: '#C6A962', fontWeight: 600, mt: 1, p: 0 }}
                    >
                      View All Projects
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>

          {/* Right Column - Sticky Form (Desktop Only) */}
          <Grid size={{xs:12, md: 4,}} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid #E5E7EB',
                position: 'sticky',
                top: 24,
              }}
            >
              <Typography
                sx={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#0B1A2A',
                  mb: 0.5,
                }}
              >
                Interested in this project?
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', color: '#64748B', mb: 3 }}>
                Get exclusive pricing and floor plans
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Your Name"
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      bgcolor: '#F8FAFC',
                    },
                  }}
                />
                <TextField
                  fullWidth
                  placeholder="Email"
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      bgcolor: '#F8FAFC',
                    },
                  }}
                />
                <TextField
                  fullWidth
                  placeholder="Phone"
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      bgcolor: '#F8FAFC',
                    },
                  }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: '#C6A962',
                    color: '#FFFFFF',
                    py: 1.5,
                    fontWeight: 700,
                    borderRadius: 1.5,
                    '&:hover': { bgcolor: '#A68B4B' },
                  }}
                >
                  Request Information
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Phone size={18} />}
                  sx={{
                    borderColor: '#0B1A2A',
                    color: '#0B1A2A',
                    fontWeight: 600,
                    borderRadius: 1.5,
                    '&:hover': { bgcolor: '#0B1A2A', color: '#FFFFFF' },
                  }}
                >
                  +971 58 852 9900
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<MessageCircle size={18} />}
                  sx={{
                    borderColor: '#25D366',
                    color: '#25D366',
                    fontWeight: 600,
                    borderRadius: 1.5,
                    '&:hover': { bgcolor: '#25D366', color: '#FFFFFF' },
                  }}
                >
                  WhatsApp
                </Button>
              </Box>

              <Button
                fullWidth
                variant="text"
                startIcon={<Download size={18} />}
                sx={{ color: '#C6A962', fontWeight: 600, mt: 2 }}
              >
                Download Brochure
              </Button>

              {/* Trust Badges */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2.5,
                  mt: 3,
                  pt: 2,
                  borderTop: '1px solid #E5E7EB',
                }}
              >
                {[
                  { icon: Shield, label: 'RERA Certified' },
                  { icon: Award, label: 'Trusted Agent' },
                  { icon: TrendingUp, label: 'Best ROI' },
                ].map((badge, i) => (
                  <Box key={i} sx={{ textAlign: 'center' }}>
                    <badge.icon size={22} color="#C6A962" />
                    <Typography sx={{ fontSize: '0.6rem', color: '#64748B', mt: 0.5 }}>
                      {badge.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Lightbox */}
      <Dialog
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{ sx: { bgcolor: 'transparent', boxShadow: 'none' } }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={() => setLightboxOpen(false)}
            sx={{ position: 'absolute', top: 10, right: 10, bgcolor: '#FFFFFF', zIndex: 10 }}
          >
            <X size={24} />
          </IconButton>
          <Box
            component="img"
            src={project.images[lightboxIndex]}
            sx={{ width: '100%', maxHeight: '85vh', objectFit: 'contain', borderRadius: 2 }}
          />
          <Box sx={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => setLightboxIndex((prev) => prev === 0 ? project.images.length - 1 : prev - 1)}
              sx={{ bgcolor: '#FFFFFF' }}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              onClick={() => setLightboxIndex((prev) => prev === project.images.length - 1 ? 0 : prev + 1)}
              sx={{ bgcolor: '#FFFFFF' }}
            >
              <ChevronRight />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProjectDetails;