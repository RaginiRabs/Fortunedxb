import React, { useState } from 'react';
import {
  Box,
  ThemeProvider,
  CssBaseline,
  createTheme,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Building2,
  Waves,
  Landmark,
  TreePalm,
  Mountain,
  Sailboat,
  Home as HomeIcon,
  MapPin,
} from 'lucide-react';

// Import all HomeComponents
import HeroSection from '../../component/HomeComponents/HeroSection';
import FeaturedProjects from '../../component/HomeComponents/FeaturedProjects';
import ExclusiveOffers from '../../component/HomeComponents/ExclusiveOffers';
import WhyInvestSection from '../../component/HomeComponents/WhyInvestSection';
import TopDevelopers from '../../component/HomeComponents/TopDevelopers';
import TestimonialsSection from '../../component/HomeComponents/TestimonialsSection';
import FirstTimeBuyerSection from '../../component/HomeComponents/FirstTimeBuyerSection';
import NewsletterSection from '../../component/HomeComponents/NewsletterSection';
import FloatingContactDial from '../../component/HomeComponents/FloatingContactDial';
import ROICalculatorDialog from '../../component/HomeComponents/ROICalculatorDialog';
import InquiryDialog from '../../component/HomeComponents/InquiryDialog';
import FilterDrawer from '../../component/HomeComponents/Filterdrawer';

// Luxury Theme with Quicksand font
const luxuryTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#C6A962',
      light: '#D4BC7D',
      dark: '#A68B4B',
    },
    secondary: {
      main: '#1A1A2E',
      light: '#2D2D44',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A2E',
      secondary: '#6B7280',
    },
  },
  typography: {
    fontFamily: '"Quicksand", sans-serif',
    h1: {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: 700,
      fontStyle: 'italic',
    },
    h2: {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: 600,
      fontStyle: 'italic',
    },
    h3: {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: 600,
      fontStyle: 'italic',
    },
    h4: {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: 600,
      fontStyle: 'italic',
    },
    h5: {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: 600,
      fontStyle: 'italic',
    },
    h6: {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: 600,
      fontStyle: 'italic',
    },
    body1: {
      fontFamily: '"Quicksand", sans-serif',
      fontStyle: 'italic',
    },
    body2: {
      fontFamily: '"Quicksand", sans-serif',
      fontStyle: 'italic',
    },
    caption: {
      fontFamily: '"Quicksand", sans-serif',
      fontStyle: 'italic',
    },
    button: {
      fontFamily: '"Quicksand", sans-serif',
      fontStyle: 'italic',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

// Static Data
const popularAreas = [
  { name: 'Downtown Dubai', projects: 45, icon: Building2, avgPrice: '2.5M' },
  { name: 'Palm Jumeirah', projects: 32, icon: TreePalm, avgPrice: '4.8M' },
  { name: 'Dubai Marina', projects: 38, icon: Waves, avgPrice: '1.8M' },
  { name: 'Business Bay', projects: 52, icon: Landmark, avgPrice: '1.5M' },
  { name: 'JVC', projects: 65, icon: HomeIcon, avgPrice: '850K' },
  { name: 'Dubai Hills', projects: 28, icon: Mountain, avgPrice: '2.2M' },
  { name: 'Creek Harbour', projects: 24, icon: Sailboat, avgPrice: '2.8M' },
  { name: 'Jumeirah Village', projects: 48, icon: MapPin, avgPrice: '1.1M' },
];

const developers = [
  { name: 'Emaar', logo: '🏛️', projects: 85, rating: 4.9 },
  { name: 'DAMAC', logo: '🌟', projects: 62, rating: 4.7 },
  { name: 'Nakheel', logo: '🌴', projects: 45, rating: 4.8 },
  { name: 'Meraas', logo: '✨', projects: 38, rating: 4.8 },
  { name: 'Sobha', logo: '💎', projects: 32, rating: 4.9 },
  { name: 'Binghatti', logo: '🔷', projects: 28, rating: 4.6 },
];

// Sample Projects Data with Offers
const sampleProjects = [
  {
    id: 1,
    name: 'The Crest by Sobha',
    developer: 'Sobha Realty',
    location: 'Sobha Hartland, Dubai',
    price: ' 1.9M',
    type: 'Apartment',
    beds: '1-3',
    baths: '1-3',
    area: '750 - 2,800',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    status: 'new',
    completion: 'Q4 2026',
    roi: '8-10%',
    paymentPlan: '60/40',
    amenities: ['Pool', 'Gym', 'Spa', 'Concierge', 'Kids Area', 'Garden'],
    // Offer Data
    offer: {
      type: 'early-bird',
      title: 'Early Bird Offer',
      description: 'Free Registration & 2 Years Service Charge Waiver',
      validUntil: '2025-01-31',
    },
  },
  {
    id: 2,
    name: 'Marina Vista',
    developer: 'Emaar',
    location: 'Dubai Marina',
    price: ' 2.5M',
    type: 'Apartment',
    beds: '1-4',
    baths: '2-4',
    area: '900 - 3,200',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    status: 'hot',
    completion: 'Q2 2025',
    roi: '7-9%',
    paymentPlan: '70/30',
    amenities: ['Beach Access', 'Pool', 'Gym', 'Valet', 'Marina View'],
    // Offer Data
    offer: {
      type: 'limited',
      title: 'Limited Time Deal',
      description: 'Free DEWA Connection & 1 Year Free Maintenance',
      validUntil: '2025-02-15',
    },
  },
  {
    id: 3,
    name: 'Palm Signature',
    developer: 'Nakheel',
    location: 'Palm Jumeirah',
    price: ' 5.8M',
    type: 'Villa',
    beds: '4-6',
    baths: '5-7',
    area: '4,500 - 8,000',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
    status: 'hot',
    completion: 'Q1 2025',
    roi: '6-8%',
    paymentPlan: '50/50',
    amenities: ['Private Beach', 'Pool', 'Garden', 'Maid Room', 'Driver Room'],
    // Offer Data
    offer: {
      type: 'exclusive',
      title: 'Ready Possession Offer',
      description: 'Free Furniture Package & No Bank Processing Fee',
      validUntil: '2025-01-15',
    },
  },
  {
    id: 4,
    name: 'Creek Edge',
    developer: 'Emaar',
    location: 'Dubai Creek Harbour',
    price: ' 1.6M',
    type: 'Apartment',
    beds: '1-3',
    baths: '1-3',
    area: '650 - 2,100',
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800',
    status: 'upcoming',
    completion: 'Q3 2027',
    roi: '9-11%',
    paymentPlan: '80/20',
    amenities: ['Creek View', 'Pool', 'Gym', 'Retail', 'Park Access'],
    offer: {
      type: 'limited',
      title: 'Limited Time Deal',
      description: 'Free DEWA Connection & 1 Year Free Maintenance',
      validUntil: '2025-02-15',
    },
  },
  {
    id: 5,
    name: 'Downtown Heights',
    developer: 'Emaar',
    location: 'Downtown Dubai',
    price: ' 3.2M',
    type: 'Apartment',
    beds: '2-4',
    baths: '2-4',
    area: '1,200 - 3,500',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    status: 'new',
    completion: 'Q4 2025',
    roi: '7-9%',
    paymentPlan: '60/40',
    amenities: ['Burj View', 'Pool', 'Gym', 'Concierge', 'Valet'],
    // Offer Data
    offer: {
      type: 'discount',
      title: '10% Launch Discount',
      description: 'Special launch pricing + Free parking spot worth  150K',
      validUntil: '2025-03-01',
    },
  },
  {
    id: 6,
    name: 'Hills Sanctuary',
    developer: 'Meraas',
    location: 'Dubai Hills Estate',
    price: ' 4.5M',
    type: 'Townhouse',
    beds: '3-5',
    baths: '4-6',
    area: '3,000 - 5,500',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    status: 'upcoming',
    completion: 'Q2 2026',
    roi: '6-8%',
    paymentPlan: '70/30',
    amenities: ['Golf View', 'Private Garden', 'Pool', 'Gym', 'Park'],
    offer: {
      type: 'limited',
      title: 'Limited Time Deal',
      description: 'Free DEWA Connection & 1 Year Free Maintenance',
      validUntil: '2025-02-15',
    },
  },
];

const Home = () => {
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [viewMode, setViewMode] = useState('grid');

  // Filter Drawer States
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([500000, 10000000]);
  const [selectedDeveloper, setSelectedDeveloper] = useState('');
  const [completionYear, setCompletionYear] = useState('');
  const [paymentPlan, setPaymentPlan] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // Dialog States
  const [roiCalculatorOpen, setRoiCalculatorOpen] = useState(false);
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // ROI Calculator States
  const [investmentAmount, setInvestmentAmount] = useState(2000000);
  const [expectedRoi, setExpectedRoi] = useState(8);

  // Save Property States
  const [savedProperties, setSavedProperties] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Filter projects based on active tab
  const getFilteredProjects = () => {
    let filtered = sampleProjects;
    switch (activeTab) {
      case 1:
        filtered = sampleProjects.filter((p) => p.status === 'hot');
        break;
      case 2:
        filtered = sampleProjects.filter((p) => p.status === 'new');
        break;
      case 3:
        filtered = sampleProjects.filter((p) => p.status === 'upcoming');
        break;
      default:
        filtered = sampleProjects;
    }
    return filtered;
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSaveProperty = (projectId) => {
    if (savedProperties.includes(projectId)) {
      setSavedProperties(savedProperties.filter((id) => id !== projectId));
      setSnackbar({ open: true, message: 'Property removed from saved', severity: 'info' });
    } else {
      setSavedProperties([...savedProperties, projectId]);
      setSnackbar({ open: true, message: 'Property saved successfully!', severity: 'success' });
    }
  };

  const handleInquiry = (project) => {
    setSelectedProject(project);
    setInquiryDialogOpen(true);
  };

  return (
    <ThemeProvider theme={luxuryTheme}>
      <CssBaseline />
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Hero Section */}
        <HeroSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          bedrooms={bedrooms}
          setBedrooms={setBedrooms}
          setFilterDrawerOpen={setFilterDrawerOpen}
          popularAreas={popularAreas}
        />

        {/* Featured Projects */}
        <FeaturedProjects
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          viewMode={viewMode}
          setViewMode={setViewMode}
          filteredProjects={getFilteredProjects()}
          savedProperties={savedProperties}
          handleSaveProperty={handleSaveProperty}
          handleInquiry={handleInquiry}
        />

        {/* Exclusive Offers / Campaign Section */}
        <ExclusiveOffers
          projectsWithOffers={sampleProjects}
          handleInquiry={handleInquiry}
        />

        {/* Why Invest Section */}
        <WhyInvestSection setRoiCalculatorOpen={setRoiCalculatorOpen} />

        {/* First Time Buyer Section */}
        <FirstTimeBuyerSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Top Developers */}
        <TopDevelopers developers={developers} />

        {/* Newsletter */}
        <NewsletterSection />

        {/* Floating Contact Dial */}
        <FloatingContactDial />

        {/* ROI Calculator Dialog */}
        <ROICalculatorDialog
          open={roiCalculatorOpen}
          onClose={() => setRoiCalculatorOpen(false)}
          investmentAmount={investmentAmount}
          setInvestmentAmount={setInvestmentAmount}
          expectedRoi={expectedRoi}
          setExpectedRoi={setExpectedRoi}
        />

        {/* Inquiry Dialog */}
        <InquiryDialog
          open={inquiryDialogOpen}
          onClose={() => setInquiryDialogOpen(false)}
          selectedProject={selectedProject}
        />

        {/* Filter Drawer */}
        <FilterDrawer
          open={filterDrawerOpen}
          onClose={() => setFilterDrawerOpen(false)}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedDeveloper={selectedDeveloper}
          setSelectedDeveloper={setSelectedDeveloper}
          completionYear={completionYear}
          setCompletionYear={setCompletionYear}
          paymentPlan={paymentPlan}
          setPaymentPlan={setPaymentPlan}
          selectedAmenities={selectedAmenities}
          setSelectedAmenities={setSelectedAmenities}
          developers={developers}
        />

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default Home;