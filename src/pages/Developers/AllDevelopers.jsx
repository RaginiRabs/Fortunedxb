import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField,
  InputAdornment,
  Grid,
} from '@mui/material';
import { 
  Building2, 
  Search,
} from 'lucide-react';
import properties from '../../Data/properties';
import DeveloperCard from '../../component/DeveloperCard';

const AllDevelopers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Extract unique developers
  const uniqueDevelopers = properties.reduce((acc, property) => {
    const developerName = property.builder.name;
    if (!acc.find(dev => dev.name === developerName)) {
      const developerProjects = properties.filter(p => p.builder.name === developerName);
      
      acc.push({
        ...property.builder,
        totalProjects: property.builder.completedProjects + property.builder.ongoingProjects,
        featuredImage: property.image,
      });
    }
    return acc;
  }, []);

  // Filter developers based on search only
  const filteredDevelopers = uniqueDevelopers.filter(developer =>
    developer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    developer.about?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    developer.specializations?.some(spec => 
      spec.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Box sx={{  minHeight: '100vh', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800, 
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              color: '#C39F58',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              flexWrap: 'wrap'
            }}
          >
            <Building2 size={42} color="#C39F58" />
            Premium Developers
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#555', 
              maxWidth: 700, 
              mx: 'auto',
              fontWeight: 400,
              fontSize: { xs: '1rem', sm: '1.2rem' }
            }}
          >
            Discover Dubai's Most Trusted & Award-Winning Real Estate Developers
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box sx={{ maxWidth: 680, mx: 'auto', mb: { xs: 4, md: 6 } }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search developers by name, projects, or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ 
              bgcolor: 'white',
              borderRadius: 3,
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                py: 0.5,
                '&:hover fieldset': { borderColor: '#C39F58' },
                '&.Mui-focused fieldset': { borderColor: '#C39F58' }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={22} color="#666" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Results Count */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: { xs: 4, md: 5 },
          px: 2
        }}>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#555', 
              fontWeight: 500,
              fontSize: { xs: '0.95rem', sm: '1rem' }
            }}
          >
            Showing <strong>{filteredDevelopers.length}</strong> of <strong>{uniqueDevelopers.length}</strong> premium developers
          </Typography>
        </Box>

        {/* Developers Grid - Fully Responsive */}
        <Grid container spacing={{ xs: 4, sm: 8, md: 5 }}>
          {filteredDevelopers.map((developer, index) => (
            <Grid size={{xs: 12, md: 4, sm: 6}} key={index}>
              <DeveloperCard developer={developer} />
            </Grid>
          ))}
        </Grid>

        {/* No Results */}
        {filteredDevelopers.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Building2 size={80} color="#ddd" />
            <Typography variant="h5" sx={{ mt: 3, color: '#888', fontWeight: 600 }}>
              No developers found
            </Typography>
            <Typography variant="body1" sx={{ color: '#aaa', mt: 1 }}>
              {searchTerm ? `No results for "${searchTerm}"` : 'Try searching for a developer'}
            </Typography>
            {searchTerm && (
              <Typography
                variant="body2"
                sx={{ 
                  mt: 3, 
                  color: '#C39F58', 
                  cursor: 'pointer', 
                  fontWeight: 600,
                  textDecoration: 'underline'
                }}
                onClick={() => setSearchTerm('')}
              >
                Clear search
              </Typography>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default AllDevelopers;