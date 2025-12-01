import React from 'react';
import {
  Box,
  Paper,
  TextField,
  InputAdornment,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';
import { Search, Filter } from 'lucide-react';

const SearchBox = ({
  searchQuery,
  setSearchQuery,
  selectedArea,
  setSelectedArea,
  propertyType,
  setPropertyType,
  bedrooms,
  setBedrooms,
  setFilterDrawerOpen,
  popularAreas,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 800,
        mx: 'auto',
        borderRadius: 2,
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
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
            }
          }}
        />
        <Button
          variant="contained"
          size="large"
          sx={{
            background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
            color: '#FFFFFF',
            borderRadius: 1,
            px: 4,
            py: 1.5,
            mr: 1,
            minWidth: 140,
            boxShadow: '0 4px 15px rgba(198, 169, 98, 0.4)',
            fontFamily: '"Quicksand", sans-serif',
            fontStyle: 'italic',
            fontWeight: 600,
            '&:hover': {
              background: 'linear-gradient(135deg, #D4BC7D 0%, #C6A962 100%)',
            },
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
          <InputLabel
            sx={{
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
            }}
          >
            Area
          </InputLabel>
          <Select
            value={selectedArea}
            label="Area"
            onChange={(e) => setSelectedArea(e.target.value)}
            sx={{
              borderRadius: 1,
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
            }}
          >
            <MenuItem value="">All Areas</MenuItem>
            {popularAreas.map(area => (
              <MenuItem key={area.name} value={area.name}>{area.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel
            sx={{
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
            }}
          >
            Property Type
          </InputLabel>
          <Select
            value={propertyType}
            label="Property Type"
            onChange={(e) => setPropertyType(e.target.value)}
            sx={{
              borderRadius: 1,
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
            }}
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="apartment">Apartment</MenuItem>
            <MenuItem value="villa">Villa</MenuItem>
            <MenuItem value="townhouse">Townhouse</MenuItem>
            <MenuItem value="penthouse">Penthouse</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel
            sx={{
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
            }}
          >
            Bedrooms
          </InputLabel>
          <Select
            value={bedrooms}
            label="Bedrooms"
            onChange={(e) => setBedrooms(e.target.value)}
            sx={{
              borderRadius: 1,
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
            }}
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
          sx={{
            borderRadius: 1,
            borderColor: 'divider',
            fontFamily: '"Quicksand", sans-serif',
            fontStyle: 'italic',
            fontWeight: 600,
          }}
        >
          More Filters
        </Button>
      </Box>
    </Paper>
  );
};

export default SearchBox;