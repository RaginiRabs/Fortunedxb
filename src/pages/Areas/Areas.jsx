import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import {
  MapPin,
  Building2,
  TrendingUp,
  ArrowUpRight,
  Star,
} from 'lucide-react';
import { AreaCard, FeaturedAreaCard } from '../../component/AreaCard';

// Dubai Areas Data (unchanged – keep exactly as you had)
const dubaiAreas = [
  {
    id: 1,
    name: 'Downtown Dubai',
    tagline: 'The Heart of the City',
    description: 'Home to Burj Khalifa & Dubai Mall',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    properties: 156,
    avgPrice: '2.5M',
    priceGrowth: '+18%',
    highlights: ['Burj Khalifa Views', 'Premium Lifestyle', 'High ROI'],
    category: 'Premium',
  },
  {
    id: 2,
    name: 'Dubai Marina',
    tagline: 'Waterfront Living',
    description: 'Iconic waterfront community',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=600&fit=crop',
    properties: 243,
    avgPrice: '1.8M',
    priceGrowth: '+15%',
    highlights: ['Marina Views', 'Beach Access', 'Vibrant Nightlife'],
    category: 'Waterfront',
  },
  {
    id: 3,
    name: 'Palm Jumeirah',
    tagline: 'The Eighth Wonderland',
    description: 'World-famous man-made island',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop',
    properties: 89,
    avgPrice: '5.2M',
    priceGrowth: '+22%',
    highlights: ['Beachfront Villas', 'Exclusive Living', 'Luxury Resorts'],
    category: 'Ultra Luxury',
  },
  {
    id: 4,
    name: 'Business Bay',
    tagline: 'Commercial Hub',
    description: 'Dubai\'s business district',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    properties: 198,
    avgPrice: '1.4M',
    priceGrowth: '+12%',
    highlights: ['Canal Views', 'Business Center', 'Modern Living'],
    category: 'Business',
  },
  {
    id: 5,
    name: 'Emirates Hills',
    tagline: 'Beverly Hills of Dubai',
    description: 'Ultra-luxury golf community',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    properties: 45,
    avgPrice: '15M',
    priceGrowth: '+25%',
    highlights: ['Golf Course', 'Mega Mansions', 'Privacy & Security'],
    category: 'Ultra Luxury',
  },
  {
    id: 6,
    name: 'JBR - Jumeirah Beach',
    tagline: 'Beach Life Paradise',
    description: 'Beachfront living at its finest',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    properties: 134,
    avgPrice: '2.1M',
    priceGrowth: '+14%',
    highlights: ['Beach Access', 'The Walk JBR', 'Family Friendly'],
    category: 'Beachfront',
  },
  {
    id: 7,
    name: 'Dubai Hills Estate',
    tagline: 'Green Community',
    description: 'Master-planned green community',
    image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=800&h=600&fit=crop',
    properties: 167,
    avgPrice: '3.2M',
    priceGrowth: '+20%',
    highlights: ['Golf Course', 'Parks & Gardens', 'Premium Schools'],
    category: 'Family',
  },
  {
    id: 8,
    name: 'Creek Harbour',
    tagline: 'Future Icon',
    description: 'Home to Dubai Creek Tower',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    properties: 112,
    avgPrice: '1.9M',
    priceGrowth: '+28%',
    highlights: ['Creek Views', 'Future Growth', 'Smart City'],
    category: 'Emerging',
  },
  {
    id: 9,
    name: 'Jumeirah Village Circle',
    tagline: 'Affordable Luxury',
    description: 'Family-friendly community',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    properties: 312,
    avgPrice: '0.8M',
    priceGrowth: '+16%',
    highlights: ['Parks', 'Schools Nearby', 'Great Value'],
    category: 'Family',
  },
  {
    id: 10,
    name: 'DIFC',
    tagline: 'Financial District',
    description: 'Dubai\'s Wall Street',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop',
    properties: 76,
    avgPrice: '3.8M',
    priceGrowth: '+19%',
    highlights: ['Gate Avenue', 'Fine Dining', 'Art Galleries'],
    category: 'Premium',
  },
];

const Areas = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // IMPORTANT: IDs must exactly match the category string (case-sensitive!)
  const filters = [
    { id: 'all', label: 'All Areas' },
    { id: 'Premium', label: 'Premium' },
    { id: 'Waterfront', label: 'Waterfront' },
    { id: 'Family', label: 'Family' },
    { id: 'Emerging', label: 'Emerging' },
    { id: 'Ultra Luxury', label: 'Ultra Luxury' },
    { id: 'Beachfront', label: 'Beachfront' },
    { id: 'Business', label: 'Business' },
  ];

  // Perfect filtering – handles spaces and case
  const filteredAreas = activeFilter === 'all'
    ? dubaiAreas
    : dubaiAreas.filter(area =>
        area.category === activeFilter
      );

  const featuredAreas = filteredAreas.slice(0, 2);
  const gridAreas = filteredAreas.slice(2);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0B1A2A', position: 'relative', overflow: 'hidden' }}>
      {/* Background Effects */}
      <Box sx={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: `linear-gradient(90deg, #C6A962 1px, transparent 1px), linear-gradient(0deg, #C6A962 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      <Box sx={{ position: 'absolute', top: '5%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(198,169,98,0.08) 0%, transparent 70%)' }} />
      <Box sx={{ position: 'absolute', bottom: '10%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(198,169,98,0.05) 0%, transparent 70%)' }} />

      {/* HERO */}
      <Box sx={{ pt: { xs: 12, md: 16 }, pb: 8 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(198,169,98,0.1)', border: '1px solid rgba(198,169,98,0.3)', borderRadius: '50px', px: 3, py: 1, mb: 3 }}>
              <MapPin size={18} color="#C6A962" />
              <Typography sx={{ color: '#C6A962', fontWeight: 600, letterSpacing: 2 }}>DISCOVER PRIME LOCATIONS</Typography>
            </Box>
            <Typography sx={{ color: 'white', fontFamily: '"Playfair Display", serif', fontSize: { xs: '3rem', md: '4.5rem' }, fontWeight: 700, lineHeight: 1.1 }}>
              Dubai's Most <Box component="span" sx={{ background: 'linear-gradient(135deg, #C6A962, #E8D5A3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Prestigious</Box><br />Neighborhoods
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', mt: 2, maxWidth: 800, mx: 'auto' }}>
              Explore exclusive communities where luxury meets lifestyle.
            </Typography>
          </Box>

          {/* Filter Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 6 }}>
            {filters.map(filter => (
              <Box
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                sx={{
                  px: 4, py: 1.5, borderRadius: '50px', cursor: 'pointer', fontWeight: 600,
                  bgcolor: activeFilter === filter.id ? '#C6A962' : 'rgba(255,255,255,0.08)',
                  color: activeFilter === filter.id ? '#0B1A2A' : '#fff',
                  border: '1px solid',
                  borderColor: activeFilter === filter.id ? '#C6A962' : 'rgba(255,255,255,0.2)',
                  transition: 'all 0.3s',
                  '&:hover': { bgcolor: activeFilter === filter.id ? '#C6A962' : 'rgba(198,169,98,0.2)', borderColor: '#C6A962' }
                }}
              >
                {filter.label}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Featured Areas */}
      {featuredAreas.length > 0 && (
        <Container maxWidth="xl" sx={{ mb: 10 }}>
          <Grid container spacing={4}>
            {featuredAreas.map(area => (
              <Grid item xs={12} md={6} key={area.id}>
                <FeaturedAreaCard area={area} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {/* All Areas Grid */}
      <Container maxWidth="xl">
        <Typography sx={{ color: 'white', fontFamily: '"Playfair Display", serif', fontSize: '2.2rem', fontWeight: 700, mb: 2 }}>
          All Prime Locations
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.6)', mb: 6 }}>
          {filteredAreas.length} neighborhoods available
        </Typography>

        <Grid container spacing={4}>
          {gridAreas.map(area => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={area.id}>
              <AreaCard area={area} />
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {filteredAreas.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 16 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.4rem', mb: 4 }}>
              No areas found in this category
            </Typography>
            <Button onClick={() => setActiveFilter('all')} variant="outlined" sx={{ borderColor: '#C6A962', color: '#C6A962', px: 4, py: 1.5, borderRadius: '50px' }}>
              View All Areas
            </Button>
          </Box>
        )}

        {/* CTA */}
        <Box sx={{ textAlign: 'center', mt: 12 }}>
          <Button variant="contained" size="large" endIcon={<ArrowUpRight />} sx={{
            bgcolor: '#C6A962', color: '#0B1A2A', px: 6, py: 2, borderRadius: '50px', fontWeight: 700, fontSize: '1.1rem',
            boxShadow: '0 15px 40px rgba(198,169,98,0.4)', '&:hover': { bgcolor: '#d4b36e', transform: 'translateY(-4px)' }
          }}>
            Explore All {dubaiAreas.length} Areas
          </Button>

          <Box sx={{ mt: 8, pt: 6, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
            {[{ icon: Building2, text: 'RERA Registered' }, { icon: TrendingUp, text: 'High ROI' }, { icon: Star, text: 'Premium Only' }].map((item, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <item.icon size={20} color="#C6A962" />
                <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>{item.text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Areas;