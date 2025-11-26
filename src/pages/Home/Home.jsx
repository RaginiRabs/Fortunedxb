import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  IconButton,
  Tab,
  Tabs,
  Paper,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Badge,
  Tooltip,
  Fade,
  Zoom,
  useMediaQuery,
  useTheme,
  AppBar,
  Toolbar,
  Menu,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Rating,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Autocomplete,
  ToggleButton,
  ToggleButtonGroup,
  Skeleton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stepper,
  Step,
  StepLabel,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';

import {
  Search,
  MapPin,
  Building2,
  Home as HomeIcon,
  Bed,
  Bath,
  Maximize2,
  Phone,
  Mail,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Heart,
  Share2,
  Filter,
  Grid3X3,
  List as ListIcon,
  TrendingUp,
  Star,
  Shield,
  Award,
  Globe,
  Calculator,
  FileText,
  Video,
  Calendar,
  Clock,
  Users,
  Briefcase,
  PiggyBank,
  Target,
  Zap,
  Crown,
  Gem,
  Building,
  Landmark,
  Plane,
  Car,
  Palmtree,
  Waves,
  Sun,
  Moon,
  Menu as MenuIcon,
  X,
  ArrowRight,
  ArrowUpRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Eye,
  Download,
  Send,
  Check,
  Info,
  HelpCircle,
  Sparkles,
  Rocket,
  BarChart3,
  PieChart,
  LineChart,
  DollarSign,
  Percent,
  Key,
  Handshake,
  Scale,
  FileCheck,
  Headphones,
  Languages,
  WholeWord,
  CircleDollarSign,
  BadgePercent,
  Timer,
  Flame,
  Verified,
  ShieldCheck,
  Gift,
  Banknote,
  CreditCard,
  Wallet,
  ArrowDown,
  MousePointer,
  ChevronUp,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MapPinned,
  Navigation,
  Compass,
  LocateFixed,
} from 'lucide-react';

// Custom Luxury Theme
const luxuryTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#C6A962',
      light: '#D4BC7D',
      dark: '#A68B4B',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1A1A2E',
      light: '#2D2D44',
      dark: '#0F0F1A',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A2E',
      secondary: '#6B7280',
    },
    success: {
      main: '#10B981',
    },
    warning: {
      main: '#F59E0B',
    },
    error: {
      main: '#EF4444',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '12px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});

// Sample Data
const featuredProjects = [
  {
    id: 1,
    name: 'The Royal Atlantis Residences',
    developer: 'Emaar Properties',
    location: 'Palm Jumeirah',
    price: 'AED 5.2M',
    priceFrom: 5200000,
    type: 'Luxury Apartment',
    beds: '1-4',
    baths: '2-5',
    area: '1,200 - 4,500',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
    status: 'hot',
    completion: 'Q4 2025',
    roi: '8-12%',
    paymentPlan: '60/40',
    amenities: ['Private Beach', 'Infinity Pool', 'Spa', 'Concierge'],
    featured: true,
    views: 12500,
    saves: 890,
  },
  {
    id: 2,
    name: 'Dubai Creek Harbour Tower',
    developer: 'Emaar Properties',
    location: 'Dubai Creek Harbour',
    price: 'AED 1.8M',
    priceFrom: 1800000,
    type: 'Waterfront Living',
    beds: '1-3',
    baths: '1-3',
    area: '750 - 2,800',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    status: 'new',
    completion: 'Q2 2026',
    roi: '7-10%',
    paymentPlan: '70/30',
    amenities: ['Marina View', 'Gym', 'Kids Area', 'Smart Home'],
    featured: true,
    views: 8900,
    saves: 567,
  },
  {
    id: 3,
    name: 'DAMAC Lagoons Portofino',
    developer: 'DAMAC Properties',
    location: 'DAMAC Lagoons',
    price: 'AED 1.2M',
    priceFrom: 1200000,
    type: 'Townhouse',
    beds: '3-5',
    baths: '3-5',
    area: '2,200 - 4,000',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    status: 'upcoming',
    completion: 'Q1 2027',
    roi: '9-14%',
    paymentPlan: '80/20',
    amenities: ['Private Garden', 'Lagoon Access', 'Club House', 'Tennis Court'],
    featured: true,
    views: 15600,
    saves: 1230,
  },
  {
    id: 4,
    name: 'Sobha Hartland II',
    developer: 'Sobha Realty',
    location: 'Mohammed Bin Rashid City',
    price: 'AED 2.5M',
    priceFrom: 2500000,
    type: 'Villa',
    beds: '4-6',
    baths: '4-7',
    area: '3,500 - 8,000',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    status: 'hot',
    completion: 'Q3 2025',
    roi: '6-9%',
    paymentPlan: '75/25',
    amenities: ['Private Pool', 'Garden', 'Maid Room', 'Driver Room'],
    featured: true,
    views: 9800,
    saves: 780,
  },
  {
    id: 5,
    name: 'Binghatti Mercedes-Benz Places',
    developer: 'Binghatti Developers',
    location: 'Downtown Dubai',
    price: 'AED 3.8M',
    priceFrom: 3800000,
    type: 'Branded Residence',
    beds: '1-4',
    baths: '2-4',
    area: '900 - 3,200',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
    status: 'new',
    completion: 'Q4 2026',
    roi: '10-15%',
    paymentPlan: '60/40',
    amenities: ['Branded Interiors', 'Valet Parking', 'Sky Lounge', 'EV Charging'],
    featured: true,
    views: 22300,
    saves: 1890,
  },
  {
    id: 6,
    name: 'Ellington Beach House',
    developer: 'Ellington Properties',
    location: 'Palm Jumeirah',
    price: 'AED 4.5M',
    priceFrom: 4500000,
    type: 'Beachfront Villa',
    beds: '3-5',
    baths: '4-6',
    area: '2,800 - 5,500',
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800',
    status: 'upcoming',
    completion: 'Q2 2027',
    roi: '7-11%',
    paymentPlan: '70/30',
    amenities: ['Beach Access', 'Rooftop Terrace', 'Wine Cellar', 'Home Theater'],
    featured: true,
    views: 11200,
    saves: 920,
  },
];

const popularAreas = [
  { name: 'Downtown Dubai', projects: 145, icon: Building2, avgPrice: '3.2M' },
  { name: 'Palm Jumeirah', projects: 89, icon: Palmtree, avgPrice: '5.8M' },
  { name: 'Dubai Marina', projects: 112, icon: Waves, avgPrice: '2.5M' },
  { name: 'Business Bay', projects: 98, icon: Briefcase, avgPrice: '1.8M' },
  { name: 'JVC', projects: 156, icon: HomeIcon, avgPrice: '850K' },
  { name: 'Dubai Hills', projects: 78, icon: Landmark, avgPrice: '2.8M' },
  { name: 'MBR City', projects: 65, icon: Crown, avgPrice: '3.5M' },
  { name: 'Creek Harbour', projects: 54, icon: Compass, avgPrice: '2.2M' },
];

const developers = [
  { name: 'Emaar Properties', logo: '🏛️', projects: 45, rating: 4.9 },
  { name: 'DAMAC Properties', logo: '🏰', projects: 38, rating: 4.7 },
  { name: 'Sobha Realty', logo: '🏠', projects: 28, rating: 4.8 },
  { name: 'Nakheel', logo: '🌴', projects: 32, rating: 4.6 },
  { name: 'Meraas', logo: '✨', projects: 25, rating: 4.8 },
  { name: 'Dubai Properties', logo: '🏢', projects: 35, rating: 4.5 },
];

const investorBenefits = [
  {
    icon: Shield,
    title: '0% Property Tax',
    description: 'Dubai offers zero property tax, maximizing your investment returns',
  },
  {
    icon: Globe,
    title: '100% Foreign Ownership',
    description: 'Full property ownership rights for international investors in freehold areas',
  },
  {
    icon: TrendingUp,
    title: 'High ROI Potential',
    description: 'Average rental yields of 6-10%, among the highest globally',
  },
  {
    icon: Plane,
    title: 'Golden Visa Eligibility',
    description: 'Property investment of AED 2M+ qualifies for 10-year Golden Visa',
  },
  {
    icon: Banknote,
    title: 'Flexible Payment Plans',
    description: 'Developer payment plans up to 80/20 post-handover',
  },
  {
    icon: ShieldCheck,
    title: 'RERA Protected',
    description: 'All transactions regulated by Dubai Real Estate Regulatory Agency',
  },
];

const testimonials = [
  {
    name: 'James Richardson',
    country: 'United Kingdom',
    flag: '🇬🇧',
    text: 'Investing in Dubai through Fortune DXB was seamless. Their team guided me through every step of purchasing my off-plan apartment in Downtown.',
    rating: 5,
    investment: 'AED 2.8M',
    project: 'Burj Royale',
  },
  {
    name: 'Chen Wei',
    country: 'China',
    flag: '🇨🇳',
    text: 'The ROI calculator and market insights helped me make an informed decision. My Palm Jumeirah investment has exceeded expectations.',
    rating: 5,
    investment: 'AED 6.5M',
    project: 'Atlantis Residences',
  },
  {
    name: 'Mikhail Petrov',
    country: 'Russia',
    flag: '🇷🇺',
    text: 'Professional service with multilingual support. They handled everything including Golden Visa processing after my property purchase.',
    rating: 5,
    investment: 'AED 4.2M',
    project: 'One Za\'abeel',
  },
];

const quickStats = [
  { value: '500+', label: 'Off-Plan Projects', icon: Building2 },
  { value: '50+', label: 'Top Developers', icon: Award },
  { value: '15,000+', label: 'Happy Investors', icon: Users },
  { value: 'AED 25B+', label: 'Total Investments', icon: TrendingUp },
];

// Main Home Component
const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  // State Management
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [priceRange, setPriceRange] = useState([500000, 10000000]);
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [savedProperties, setSavedProperties] = useState([]);
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [roiCalculatorOpen, setRoiCalculatorOpen] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(2000000);
  const [expectedRoi, setExpectedRoi] = useState(8);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSaveProperty = (projectId) => {
    if (savedProperties.includes(projectId)) {
      setSavedProperties(savedProperties.filter(id => id !== projectId));
      setSnackbarMessage('Property removed from favorites');
    } else {
      setSavedProperties([...savedProperties, projectId]);
      setSnackbarMessage('Property added to favorites');
    }
    setSnackbarOpen(true);
  };

  const handleInquiry = (project) => {
    setSelectedProject(project);
    setInquiryDialogOpen(true);
  };

  const getFilteredProjects = () => {
    let filtered = featuredProjects;
    
    if (activeTab === 1) {
      filtered = filtered.filter(p => p.status === 'hot');
    } else if (activeTab === 2) {
      filtered = filtered.filter(p => p.status === 'new');
    } else if (activeTab === 3) {
      filtered = filtered.filter(p => p.status === 'upcoming');
    }

    return filtered;
  };

  const formatPrice = (value) => {
    if (value >= 1000000) {
      return `AED ${(value / 1000000).toFixed(1)}M`;
    }
    return `AED ${(value / 1000).toFixed(0)}K`;
  };

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

  return (
    <ThemeProvider theme={luxuryTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        
        {/* Navigation Bar */}
        <AppBar 
          position="fixed" 
          elevation={isScrolled ? 4 : 0}
          sx={{ 
            bgcolor: isScrolled ? 'rgba(255,255,255,0.98)' : 'transparent',
            backdropFilter: isScrolled ? 'blur(20px)' : 'none',
            transition: 'all 0.3s ease',
            borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.08)' : 'none',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ py: 1, px: { xs: 0, md: 2 } }}>
              {/* Logo */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 45,
                    height: 45,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Crown size={24} color="white" />
                </Box>
                <Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 700,
                      color: isScrolled ? 'secondary.main' : 'white',
                      lineHeight: 1.1,
                      textShadow: isScrolled ? 'none' : '0 2px 4px rgba(0,0,0,0.3)',
                    }}
                  >
                    FORTUNE
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: isScrolled ? 'primary.main' : 'primary.light',
                      fontWeight: 600,
                      letterSpacing: 2,
                    }}
                  >
                    DXB
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ flexGrow: 1 }} />

              {/* Desktop Navigation */}
              {!isMobile && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {['Projects', 'Developers', 'Areas', 'Investment Guide', 'About'].map((item) => (
                    <Button
                      key={item}
                      sx={{
                        color: isScrolled ? 'secondary.main' : 'white',
                        fontWeight: 500,
                        px: 2,
                        '&:hover': {
                          bgcolor: isScrolled ? 'rgba(198, 169, 98, 0.1)' : 'rgba(255,255,255,0.1)',
                        },
                      }}
                    >
                      {item}
                    </Button>
                  ))}
                  
                  <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: isScrolled ? 'divider' : 'rgba(255,255,255,0.2)' }} />
                  
                  <Tooltip title="Saved Properties">
                    <IconButton sx={{ color: isScrolled ? 'secondary.main' : 'white' }}>
                      <Badge badgeContent={savedProperties.length} color="primary">
                        <Heart size={20} />
                      </Badge>
                    </IconButton>
                  </Tooltip>

                  <Button
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
                      px: 3,
                      ml: 1,
                    }}
                    startIcon={<Phone size={18} />}
                  >
                    Contact Us
                  </Button>
                </Box>
              )}

              {/* Mobile Menu Button */}
              {isMobile && (
                <IconButton 
                  onClick={() => setMobileMenuOpen(true)}
                  sx={{ color: isScrolled ? 'secondary.main' : 'white' }}
                >
                  <MenuIcon size={24} />
                </IconButton>
              )}
            </Toolbar>
          </Container>
        </AppBar>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          PaperProps={{
            sx: { width: 300, p: 2 }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Menu</Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)}>
              <X size={24} />
            </IconButton>
          </Box>
          <List>
            {['Projects', 'Developers', 'Areas', 'Investment Guide', 'About', 'Contact'].map((item) => (
              <ListItem key={item} button sx={{ borderRadius: 2, mb: 1 }}>
                <ListItemText primary={item} />
                <ChevronRight size={20} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Button
            fullWidth
            variant="contained"
            sx={{ background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)' }}
            startIcon={<Phone size={18} />}
          >
            Call Now
          </Button>
        </Drawer>

        {/* Hero Section - Google-Style Clean Design */}
        <Box
          sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #1A1A2E 100%)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Background Pattern */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.15,
            }}
          />
          
          {/* Gradient Overlay */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(26,26,46,0.7) 0%, rgba(26,26,46,0.9) 100%)',
            }}
          />

          {/* Animated Particles/Lines */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: 0.1,
              background: `
                linear-gradient(90deg, transparent 49%, rgba(198,169,98,0.3) 50%, transparent 51%),
                linear-gradient(0deg, transparent 49%, rgba(198,169,98,0.3) 50%, transparent 51%)
              `,
              backgroundSize: '50px 50px',
            }}
          />

          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: 10 }}>
            <Fade in timeout={1000}>
              <Box sx={{ textAlign: 'center' }}>
                {/* Badge */}
                <Chip
                  icon={<Sparkles size={16} />}
                  label="Dubai's #1 Off-Plan Property Portal"
                  sx={{
                    bgcolor: 'rgba(198, 169, 98, 0.2)',
                    color: 'primary.light',
                    fontWeight: 600,
                    mb: 4,
                    py: 2.5,
                    px: 1,
                    fontSize: '0.9rem',
                    border: '1px solid rgba(198, 169, 98, 0.3)',
                  }}
                />

                {/* Main Heading */}
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4rem', lg: '4.5rem' },
                    color: 'white',
                    mb: 3,
                    lineHeight: 1.1,
                    textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  Discover Your Dream
                  <Box
                    component="span"
                    sx={{
                      display: 'block',
                      background: 'linear-gradient(135deg, #C6A962 0%, #D4BC7D 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Investment in Dubai
                  </Box>
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    maxWidth: 600,
                    mx: 'auto',
                    mb: 5,
                    fontWeight: 400,
                    lineHeight: 1.8,
                  }}
                >
                  Explore 500+ exclusive off-plan projects from Dubai's top developers.
                  Your gateway to luxury living and smart investments.
                </Typography>

                {/* Search Box - Google Style */}
                <Paper
                  elevation={0}
                  sx={{
                    maxWidth: 800,
                    mx: 'auto',
                    borderRadius: '60px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                    <TextField
                      fullWidth
                      placeholder="Search by project, developer, or area..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search size={24} color="#C6A962" style={{ marginLeft: 16, marginRight: 8 }} />
                          </InputAdornment>
                        ),
                        sx: {
                          fontSize: '1.1rem',
                          py: 1.5,
                          px: 1,
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
                        borderRadius: '50px',
                        px: 4,
                        py: 1.5,
                        mr: 1,
                        minWidth: 140,
                        boxShadow: '0 4px 15px rgba(198, 169, 98, 0.4)',
                      }}
                    >
                      Search
                    </Button>
                  </Box>

                  {/* Quick Filters */}
                  <Divider />
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      gap: 2, 
                      p: 2,
                      bgcolor: 'rgba(0,0,0,0.02)',
                    }}
                  >
                    <FormControl size="small" sx={{ minWidth: 140 }}>
                      <InputLabel>Area</InputLabel>
                      <Select
                        value={selectedArea}
                        label="Area"
                        onChange={(e) => setSelectedArea(e.target.value)}
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value="">All Areas</MenuItem>
                        {popularAreas.map(area => (
                          <MenuItem key={area.name} value={area.name}>{area.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 140 }}>
                      <InputLabel>Property Type</InputLabel>
                      <Select
                        value={propertyType}
                        label="Property Type"
                        onChange={(e) => setPropertyType(e.target.value)}
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value="">All Types</MenuItem>
                        <MenuItem value="apartment">Apartment</MenuItem>
                        <MenuItem value="villa">Villa</MenuItem>
                        <MenuItem value="townhouse">Townhouse</MenuItem>
                        <MenuItem value="penthouse">Penthouse</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <InputLabel>Bedrooms</InputLabel>
                      <Select
                        value={bedrooms}
                        label="Bedrooms"
                        onChange={(e) => setBedrooms(e.target.value)}
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value="">Any</MenuItem>
                        <MenuItem value="studio">Studio</MenuItem>
                        <MenuItem value="1">1 BR</MenuItem>
                        <MenuItem value="2">2 BR</MenuItem>
                        <MenuItem value="3">3 BR</MenuItem>
                        <MenuItem value="4+">4+ BR</MenuItem>
                      </Select>
                    </FormControl>

                    <Button
                      variant="outlined"
                      startIcon={<Filter size={18} />}
                      onClick={() => setFilterDrawerOpen(true)}
                      sx={{ borderRadius: 2, borderColor: 'divider' }}
                    >
                      More Filters
                    </Button>
                  </Box>
                </Paper>

                {/* Quick Search Tags */}
                <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mr: 1, alignSelf: 'center' }}>
                    Popular:
                  </Typography>
                  {['Palm Jumeirah', 'Downtown Dubai', 'Dubai Marina', 'Emaar Projects', 'Under 2M'].map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      clickable
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.8)',
                        '&:hover': {
                          bgcolor: 'rgba(198, 169, 98, 0.3)',
                        },
                      }}
                    />
                  ))}
                </Box>

                {/* Stats Bar */}
                <Box 
                  sx={{ 
                    mt: 6,
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: { xs: 3, md: 6 },
                  }}
                >
                  {quickStats.map((stat, index) => (
                    <Box key={index} sx={{ textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <stat.icon size={24} color="#C6A962" />
                        <Typography
                          variant="h4"
                          sx={{
                            color: 'white',
                            fontWeight: 700,
                            fontFamily: '"Inter", sans-serif',
                          }}
                        >
                          {stat.value}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mt: 0.5 }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Scroll Indicator */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 40,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    animation: 'bounce 2s infinite',
                    '@keyframes bounce': {
                      '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
                      '50%': { transform: 'translateX(-50%) translateY(-10px)' },
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 30,
                      height: 50,
                      borderRadius: 15,
                      border: '2px solid rgba(255,255,255,0.3)',
                      display: 'flex',
                      justifyContent: 'center',
                      pt: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 4,
                        height: 10,
                        borderRadius: 2,
                        bgcolor: 'primary.main',
                        animation: 'scroll 2s infinite',
                        '@keyframes scroll': {
                          '0%': { opacity: 1, transform: 'translateY(0)' },
                          '100%': { opacity: 0, transform: 'translateY(20px)' },
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Container>
        </Box>

        {/* Featured Projects Section */}
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
          <Container maxWidth="xl">
            {/* Section Header */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Chip
                icon={<Gem size={16} />}
                label="Premium Selection"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontWeight: 600,
                  mb: 2,
                }}
              />
              <Typography variant="h2" sx={{ color: 'secondary.main', mb: 2 }}>
                Featured Off-Plan Projects
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
                Handpicked luxury developments from Dubai's most prestigious developers,
                offering exceptional investment opportunities.
              </Typography>
            </Box>

            {/* Category Tabs */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: '50px',
                  p: 0.5,
                  bgcolor: 'rgba(0,0,0,0.04)',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  sx={{
                    '& .MuiTab-root': {
                      borderRadius: '50px',
                      px: 3,
                      py: 1.5,
                      minHeight: 'auto',
                      fontWeight: 600,
                      textTransform: 'none',
                      color: 'text.secondary',
                      '&.Mui-selected': {
                        color: 'white',
                        bgcolor: 'primary.main',
                      },
                    },
                    '& .MuiTabs-indicator': {
                      display: 'none',
                    },
                  }}
                >
                  <Tab 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Sparkles size={18} />
                        All Projects
                      </Box>
                    } 
                  />
                  <Tab 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Flame size={18} />
                        Hot Selling
                        <Chip label="12" size="small" sx={{ bgcolor: '#EF4444', color: 'white', height: 20 }} />
                      </Box>
                    } 
                  />
                  <Tab 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rocket size={18} />
                        New Launch
                        <Chip label="8" size="small" sx={{ bgcolor: '#10B981', color: 'white', height: 20 }} />
                      </Box>
                    } 
                  />
                  <Tab 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Timer size={18} />
                        Upcoming
                        <Chip label="15" size="small" sx={{ bgcolor: '#F59E0B', color: 'white', height: 20 }} />
                      </Box>
                    } 
                  />
                </Tabs>
              </Paper>
            </Box>

            {/* View Toggle */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(e, v) => v && setViewMode(v)}
                size="small"
              >
                <ToggleButton value="grid">
                  <Grid3X3 size={18} />
                </ToggleButton>
                <ToggleButton value="list">
                  <ListIcon size={18} />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Projects Grid */}
            <Grid container spacing={3}>
              {getFilteredProjects().map((project) => (
                <Grid item xs={12} sm={6} lg={4} key={project.id}>
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
                        icon={
                          project.status === 'hot' ? <Flame size={14} /> :
                          project.status === 'new' ? <Rocket size={14} /> :
                          <Timer size={14} />
                        }
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
                </Grid>
              ))}
            </Grid>

            {/* View All Button */}
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Button
                variant="outlined"
                size="large"
                endIcon={<ArrowRight size={20} />}
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  px: 5,
                  py: 1.5,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    bgcolor: 'primary.main',
                    color: 'white',
                  },
                }}
              >
                View All 500+ Projects
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Why Invest in Dubai Section */}
        <Box
          sx={{
            py: { xs: 8, md: 12 },
            background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Pattern */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: 0.05,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C6A962' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            {/* Section Header */}
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Chip
                icon={<Globe size={16} />}
                label="Global Investment Hub"
                sx={{
                  bgcolor: 'rgba(198, 169, 98, 0.2)',
                  color: 'primary.light',
                  fontWeight: 600,
                  mb: 2,
                }}
              />
              <Typography variant="h2" sx={{ color: 'white', mb: 2 }}>
                Why Invest in Dubai Real Estate?
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, mx: 'auto' }}>
                Dubai offers unparalleled investment opportunities with tax-free returns,
                world-class infrastructure, and a thriving economy.
              </Typography>
            </Box>

            {/* Benefits Grid */}
            <Grid container spacing={4}>
              {investorBenefits.map((benefit, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      bgcolor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 4,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.06)',
                        borderColor: 'primary.main',
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 3,
                        bgcolor: 'rgba(198, 169, 98, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                      }}
                    >
                      <benefit.icon size={28} color="#C6A962" />
                    </Box>
                    <Typography variant="h6" sx={{ color: 'white', mb: 1.5, fontWeight: 600 }}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
                      {benefit.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* CTA Section */}
            <Box
              sx={{
                mt: 8,
                p: 5,
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(198, 169, 98, 0.2) 0%, rgba(198, 169, 98, 0.05) 100%)',
                border: '1px solid rgba(198, 169, 98, 0.3)',
                textAlign: 'center',
              }}
            >
              <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
                Ready to Start Your Investment Journey?
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4, maxWidth: 500, mx: 'auto' }}>
                Our expert consultants are ready to help you find the perfect investment opportunity.
                Book a free consultation today.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Calendar size={20} />}
                  sx={{
                    background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
                    px: 4,
                  }}
                >
                  Book Free Consultation
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Calculator size={20} />}
                  onClick={() => setRoiCalculatorOpen(true)}
                  sx={{
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: 'white',
                    px: 4,
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'rgba(198, 169, 98, 0.1)',
                    },
                  }}
                >
                  ROI Calculator
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Popular Areas Section */}
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
          <Container maxWidth="xl">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Chip
                icon={<MapPinned size={16} />}
                label="Prime Locations"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontWeight: 600,
                  mb: 2,
                }}
              />
              <Typography variant="h2" sx={{ color: 'secondary.main', mb: 2 }}>
                Explore Popular Areas
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
                Discover Dubai's most sought-after neighborhoods for off-plan investments.
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {popularAreas.map((area, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'rgba(198, 169, 98, 0.04)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: 'rgba(198, 169, 98, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      <area.icon size={28} color="#C6A962" />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {area.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {area.projects} Projects
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600 }}>
                      From AED {area.avgPrice}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Top Developers Section */}
        <Box
          sx={{
            py: { xs: 8, md: 12 },
            bgcolor: '#FAFAFA',
          }}
        >
          <Container maxWidth="xl">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Chip
                icon={<Award size={16} />}
                label="Trusted Partners"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontWeight: 600,
                  mb: 2,
                }}
              />
              <Typography variant="h2" sx={{ color: 'secondary.main', mb: 2 }}>
                Premier Developers
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
                We partner with Dubai's most reputable developers to bring you exclusive off-plan opportunities.
              </Typography>
            </Box>

            <Grid container spacing={3} justifyContent="center">
              {developers.map((developer, index) => (
                <Grid item xs={6} sm={4} md={2} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      cursor: 'pointer',
                      bgcolor: 'white',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    <Typography variant="h2" sx={{ mb: 1 }}>
                      {developer.logo}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {developer.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {developer.projects} Projects
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 1 }}>
                      <Star size={14} fill="#F59E0B" color="#F59E0B" />
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {developer.rating}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Testimonials Section */}
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Chip
                icon={<Users size={16} />}
                label="Client Success"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontWeight: 600,
                  mb: 2,
                }}
              />
              <Typography variant="h2" sx={{ color: 'secondary.main', mb: 2 }}>
                What Our Investors Say
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 4,
                    }}
                  >
                    <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                    <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.8 }}>
                      "{testimonial.text}"
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {testimonial.name[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {testimonial.name} {testimonial.flag}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Invested {testimonial.investment} in {testimonial.project}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* First-Time Buyer Section */}
        <Box
          sx={{
            py: { xs: 8, md: 12 },
            background: 'linear-gradient(135deg, #F8F4E8 0%, #FFF9E6 100%)',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <Chip
                  icon={<Gift size={16} />}
                  label="First-Time Buyers"
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontWeight: 600,
                    mb: 2,
                  }}
                />
                <Typography variant="h2" sx={{ color: 'secondary.main', mb: 3 }}>
                  New to Dubai Real Estate?
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8 }}>
                  We make it simple for first-time buyers to navigate the Dubai property market.
                  Our comprehensive guides and dedicated support ensure a smooth journey from inquiry to handover.
                </Typography>
                
                <Box sx={{ mb: 4 }}>
                  {[
                    { icon: FileText, text: 'Step-by-step buying guides' },
                    { icon: Calculator, text: 'Mortgage & payment calculators' },
                    { icon: Scale, text: 'Legal documentation support' },
                    { icon: Headphones, text: 'Dedicated buyer consultant' },
                    { icon: Languages, text: 'Multilingual support (15+ languages)' },
                  ].map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          bgcolor: 'rgba(198, 169, 98, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <item.icon size={20} color="#C6A962" />
                      </Box>
                      <Typography variant="body1">{item.text}</Typography>
                    </Box>
                  ))}
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Rocket size={20} />}
                  sx={{
                    background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
                    px: 4,
                  }}
                >
                  Start Your Journey
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    bgcolor: 'white',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                    Buying Process
                  </Typography>
                  <Stepper orientation="vertical" activeStep={-1}>
                    {[
                      { label: 'Property Selection', desc: 'Browse and shortlist your dream properties' },
                      { label: 'Reservation', desc: 'Secure with a small deposit (AED 10-50K)' },
                      { label: 'SPA Signing', desc: 'Sign Sales Purchase Agreement' },
                      { label: 'Payment Plan', desc: 'Follow developer payment schedule' },
                      { label: 'Handover', desc: 'Receive keys to your new property' },
                    ].map((step, index) => (
                      <Step key={index} expanded>
                        <StepLabel
                          StepIconComponent={() => (
                            <Box
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                bgcolor: 'primary.main',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                              }}
                            >
                              {index + 1}
                            </Box>
                          )}
                        >
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {step.label}
                          </Typography>
                        </StepLabel>
                        <Box sx={{ ml: 4, pb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            {step.desc}
                          </Typography>
                        </Box>
                      </Step>
                    ))}
                  </Stepper>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Newsletter Section */}
        <Box
          sx={{
            py: { xs: 8, md: 10 },
            background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
          }}
        >
          <Container maxWidth="md">
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ color: 'white', mb: 2 }}>
                Stay Updated on Dubai's Best Projects
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4 }}>
                Get exclusive early access to new launches and market insights delivered to your inbox.
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                  p: 1,
                  pl: 3,
                  borderRadius: '60px',
                  bgcolor: 'white',
                  maxWidth: 500,
                  mx: 'auto',
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Enter your email"
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  sx={{ py: 1 }}
                />
                <Button
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
                    borderRadius: '50px',
                    px: 4,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Subscribe
                </Button>
              </Paper>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', mt: 2, display: 'block' }}>
                Join 25,000+ investors receiving weekly updates
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            py: 8,
            bgcolor: '#0F0F1A',
            color: 'white',
          }}
        >
          <Container maxWidth="xl">
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <Box
                    sx={{
                      width: 45,
                      height: 45,
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Crown size={24} color="white" />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}>
                      FORTUNE
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600, letterSpacing: 2 }}>
                      DXB
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 3, lineHeight: 1.8 }}>
                  Dubai's premier off-plan property portal, connecting global investors 
                  with exclusive real estate opportunities since 2015.
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, index) => (
                    <IconButton
                      key={index}
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.1)',
                        '&:hover': { bgcolor: 'primary.main' },
                      }}
                    >
                      <Icon size={18} color="white" />
                    </IconButton>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={6} sm={3} md={2}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                  Quick Links
                </Typography>
                {['All Projects', 'Hot Selling', 'New Launches', 'Upcoming', 'Developers'].map((link) => (
                  <Typography
                    key={link}
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.6)',
                      mb: 1.5,
                      cursor: 'pointer',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {link}
                  </Typography>
                ))}
              </Grid>

              <Grid item xs={6} sm={3} md={2}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                  Popular Areas
                </Typography>
                {['Downtown Dubai', 'Palm Jumeirah', 'Dubai Marina', 'Business Bay', 'JVC'].map((area) => (
                  <Typography
                    key={area}
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.6)',
                      mb: 1.5,
                      cursor: 'pointer',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {area}
                  </Typography>
                ))}
              </Grid>

              <Grid item xs={6} sm={3} md={2}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                  Resources
                </Typography>
                {['Investment Guide', 'ROI Calculator', 'Golden Visa', 'Mortgage Info', 'Market Reports'].map((resource) => (
                  <Typography
                    key={resource}
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.6)',
                      mb: 1.5,
                      cursor: 'pointer',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {resource}
                  </Typography>
                ))}
              </Grid>

              <Grid item xs={6} sm={3} md={2}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                  Contact
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Phone size={16} color="#C6A962" />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    +971 4 XXX XXXX
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Mail size={16} color="#C6A962" />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    info@fortunedxb.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <MapPin size={16} color="#C6A962" />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                    Business Bay, Dubai, UAE
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                © 2024 Fortune DXB. All rights reserved. | RERA Licensed
              </Typography>
              <Box sx={{ display: 'flex', gap: 3 }}>
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                  <Typography
                    key={link}
                    variant="caption"
                    sx={{
                      color: 'rgba(255,255,255,0.5)',
                      cursor: 'pointer',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {link}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Floating Action Buttons */}
        <SpeedDial
          ariaLabel="Contact options"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
          }}
          icon={<SpeedDialIcon icon={<MessageCircle />} openIcon={<X />} />}
          FabProps={{
            sx: {
              background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #A68B4B 0%, #8B7340 100%)',
              },
            },
          }}
        >
          <SpeedDialAction
            icon={<MessageCircle size={20} />}
            tooltipTitle="WhatsApp"
            sx={{ bgcolor: '#25D366' }}
          />
          <SpeedDialAction
            icon={<Phone size={20} />}
            tooltipTitle="Call Us"
          />
          <SpeedDialAction
            icon={<Mail size={20} />}
            tooltipTitle="Email"
          />
          <SpeedDialAction
            icon={<Video size={20} />}
            tooltipTitle="Video Call"
          />
        </SpeedDial>

        {/* ROI Calculator Dialog */}
        <Dialog
          open={roiCalculatorOpen}
          onClose={() => setRoiCalculatorOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 4 }
          }}
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Calculator size={24} color="#C6A962" />
              <Typography variant="h6">ROI Calculator</Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ py: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Estimate your potential returns on Dubai off-plan property investment.
              </Typography>
              
              <Typography variant="body2" sx={{ mb: 1 }}>
                Investment Amount: <strong>{formatPrice(investmentAmount)}</strong>
              </Typography>
              <Slider
                value={investmentAmount}
                onChange={(e, v) => setInvestmentAmount(v)}
                min={500000}
                max={20000000}
                step={100000}
                sx={{ mb: 3 }}
              />

              <Typography variant="body2" sx={{ mb: 1 }}>
                Expected Annual ROI: <strong>{expectedRoi}%</strong>
              </Typography>
              <Slider
                value={expectedRoi}
                onChange={(e, v) => setExpectedRoi(v)}
                min={4}
                max={15}
                step={0.5}
                sx={{ mb: 4 }}
              />

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  bgcolor: 'rgba(198, 169, 98, 0.1)',
                  borderRadius: 3,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Annual Return
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#10B981' }}>
                      {formatPrice(investmentAmount * expectedRoi / 100)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      5-Year Return
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#10B981' }}>
                      {formatPrice(investmentAmount * expectedRoi / 100 * 5)}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setRoiCalculatorOpen(false)}>Close</Button>
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
              }}
            >
              Get Detailed Analysis
            </Button>
          </DialogActions>
        </Dialog>

        {/* Inquiry Dialog */}
        <Dialog
          open={inquiryDialogOpen}
          onClose={() => setInquiryDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 4 }
          }}
        >
          <DialogTitle>
            <Typography variant="h6">
              Inquire About {selectedProject?.name}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ py: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Full Name" fullWidth />
              <TextField label="Email" type="email" fullWidth />
              <TextField label="Phone" fullWidth />
              <FormControl fullWidth>
                <InputLabel>I'm interested in</InputLabel>
                <Select label="I'm interested in">
                  <MenuItem value="buying">Buying for Self</MenuItem>
                  <MenuItem value="investment">Investment</MenuItem>
                  <MenuItem value="both">Both</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Message"
                multiline
                rows={3}
                fullWidth
                defaultValue={`I'm interested in ${selectedProject?.name}. Please share more details.`}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setInquiryDialogOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              startIcon={<Send size={18} />}
              sx={{
                background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
              }}
            >
              Submit Inquiry
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            variant="filled"
            sx={{ borderRadius: 2 }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>

        {/* Advanced Filter Drawer */}
        <Drawer
          anchor="right"
          open={filterDrawerOpen}
          onClose={() => setFilterDrawerOpen(false)}
          PaperProps={{
            sx: { width: { xs: '100%', sm: 400 }, p: 3 }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Advanced Filters</Typography>
            <IconButton onClick={() => setFilterDrawerOpen(false)}>
              <X size={24} />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                Price Range
              </Typography>
              <Slider
                value={priceRange}
                onChange={(e, v) => setPriceRange(v)}
                min={500000}
                max={20000000}
                step={100000}
                valueLabelDisplay="auto"
                valueLabelFormat={formatPrice}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" color="text.secondary">
                  {formatPrice(priceRange[0])}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatPrice(priceRange[1])}
                </Typography>
              </Box>
            </Box>

            <FormControl fullWidth>
              <InputLabel>Developer</InputLabel>
              <Select label="Developer">
                <MenuItem value="">All Developers</MenuItem>
                {developers.map(d => (
                  <MenuItem key={d.name} value={d.name}>{d.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Completion Year</InputLabel>
              <Select label="Completion Year">
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
                <MenuItem value="2025">2025</MenuItem>
                <MenuItem value="2026">2026</MenuItem>
                <MenuItem value="2027">2027+</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Payment Plan</InputLabel>
              <Select label="Payment Plan">
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="60/40">60/40</MenuItem>
                <MenuItem value="70/30">70/30</MenuItem>
                <MenuItem value="80/20">80/20</MenuItem>
                <MenuItem value="post-handover">Post-Handover</MenuItem>
              </Select>
            </FormControl>

            <Box>
              <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                Amenities
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {['Pool', 'Gym', 'Beach Access', 'Kids Area', 'Parking', 'Concierge', 'Spa', 'Garden'].map((amenity) => (
                  <Chip
                    key={amenity}
                    label={amenity}
                    clickable
                    variant="outlined"
                    sx={{
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderColor: 'primary.main',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: 'auto', pt: 3, display: 'flex', gap: 2 }}>
            <Button variant="outlined" fullWidth>
              Reset All
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{
                background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
              }}
            >
              Apply Filters
            </Button>
          </Box>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
};

export default Home;