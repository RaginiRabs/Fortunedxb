import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Crown,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';
import fortuneLogo from '../assets/logo.PNG';

const Footer = () => {
  return (
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
                component="img"
                src={fortuneLogo}
                alt="Fortune DXB"
                sx={{
                  width: 50,
                  height: 50,
                  objectFit: 'contain',
                  borderRadius: '10px',
                }}
              />
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
  );
};

export default Footer;