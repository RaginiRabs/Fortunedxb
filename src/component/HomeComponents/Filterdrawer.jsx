import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
} from '@mui/material';
import { X, RotateCcw } from 'lucide-react';

const FilterDrawer = ({
  open,
  onClose,
  priceRange,
  setPriceRange,
  selectedDeveloper,
  setSelectedDeveloper,
  completionYear,
  setCompletionYear,
  paymentPlan,
  setPaymentPlan,
  selectedAmenities,
  setSelectedAmenities,
  developers,
}) => {
  const amenitiesList = [
    'Pool',
    'Gym',
    'Spa',
    'Concierge',
    'Beach Access',
    'Golf Course',
    'Kids Play Area',
    'BBQ Area',
    'Yoga Studio',
    'Cinema Room',
    'Co-working Space',
    'Rooftop Lounge',
  ];

  const formatPrice = (value) => {
    if (value >= 1000000) {
      return `AED ${(value / 1000000).toFixed(1)}M`;
    }
    return `AED ${(value / 1000).toFixed(0)}K`;
  };

  const handleAmenityToggle = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleReset = () => {
    setPriceRange([500000, 10000000]);
    setSelectedDeveloper('');
    setCompletionYear('');
    setPaymentPlan('');
    setSelectedAmenities([]);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 }, p: 3 },
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Advanced Filters
        </Typography>
        <IconButton onClick={onClose}>
          <X size={24} />
        </IconButton>
      </Box>

      {/* Price Range */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
          Price Range
        </Typography>
        <Box sx={{ px: 1 }}>
          <Slider
            value={priceRange}
            onChange={(e, v) => setPriceRange(v)}
            min={500000}
            max={50000000}
            step={500000}
            valueLabelDisplay="auto"
            valueLabelFormat={formatPrice}
            sx={{
              '& .MuiSlider-thumb': {
                bgcolor: 'primary.main',
              },
              '& .MuiSlider-track': {
                bgcolor: 'primary.main',
              },
            }}
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
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Developer */}
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth size="small">
          <InputLabel>Developer</InputLabel>
          <Select
            value={selectedDeveloper}
            label="Developer"
            onChange={(e) => setSelectedDeveloper(e.target.value)}
          >
            <MenuItem value="">All Developers</MenuItem>
            {developers.map((dev) => (
              <MenuItem key={dev.name} value={dev.name}>
                {dev.logo} {dev.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Completion Year */}
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth size="small">
          <InputLabel>Completion Year</InputLabel>
          <Select
            value={completionYear}
            label="Completion Year"
            onChange={(e) => setCompletionYear(e.target.value)}
          >
            <MenuItem value="">Any</MenuItem>
            <MenuItem value="2024">2024</MenuItem>
            <MenuItem value="2025">2025</MenuItem>
            <MenuItem value="2026">2026</MenuItem>
            <MenuItem value="2027">2027</MenuItem>
            <MenuItem value="2028">2028+</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Payment Plan */}
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth size="small">
          <InputLabel>Payment Plan</InputLabel>
          <Select
            value={paymentPlan}
            label="Payment Plan"
            onChange={(e) => setPaymentPlan(e.target.value)}
          >
            <MenuItem value="">Any</MenuItem>
            <MenuItem value="80/20">80/20</MenuItem>
            <MenuItem value="70/30">70/30</MenuItem>
            <MenuItem value="60/40">60/40</MenuItem>
            <MenuItem value="50/50">50/50</MenuItem>
            <MenuItem value="post-handover">Post-Handover</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Amenities */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
          Amenities
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {amenitiesList.map((amenity) => (
            <Chip
              key={amenity}
              label={amenity}
              clickable
              onClick={() => handleAmenityToggle(amenity)}
              sx={{
                bgcolor: selectedAmenities.includes(amenity)
                  ? 'primary.main'
                  : 'rgba(0,0,0,0.04)',
                color: selectedAmenities.includes(amenity) ? 'white' : 'text.primary',
                '&:hover': {
                  bgcolor: selectedAmenities.includes(amenity)
                    ? 'primary.dark'
                    : 'rgba(0,0,0,0.08)',
                },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ mt: 'auto', display: 'flex', gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<RotateCcw size={18} />}
          onClick={handleReset}
          sx={{ borderColor: 'divider' }}
        >
          Reset
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{
            background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
          }}
        >
          Apply Filters
        </Button>
      </Box>
    </Drawer>
  );
};

export default FilterDrawer;