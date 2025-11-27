import React from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  Grid,
  Paper,
  Avatar,
  Divider,
  Rating,
} from '@mui/material';
import { Users } from 'lucide-react';

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

const TestimonialsSection = () => {
  return (
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
  );
};

export default TestimonialsSection;