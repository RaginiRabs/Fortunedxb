import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  IconButton,
  Divider,
  Stack,
  Chip,
  Grid,
  Fade,
  Slide,
  Grow,
  useTheme,
} from '@mui/material';
import {
  MapPin, Phone, Mail, Home as HomeIcon, TrendingUp, Shield, Award, Sparkles,
  ChevronLeft, ChevronRight, CheckCircle2, CalendarCheck, Zap, ArrowRight
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import properties from '../../Data/properties';

const MotionBox = motion(Box);

const Home = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const campaignProperty = properties.find(p => p.offer);

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>

      {/* HERO SECTION */}
      <Box sx={{
        background: isDark
          ? 'linear-gradient(135deg, #0A1628 0%, #162236 100%)'
          : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        py: { xs: 12, md: 20 },
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Chip label="Dubai's Premier Real Estate Partner" sx={{ bgcolor: isDark ? 'rgba(195,159,88,0.2)' : '#fdf4e3', color: 'primary.main', mb: 3, fontWeight: 600 }} />
            <Fade in timeout={1000}>
              <Typography variant="h1" sx={{
                fontSize: { xs: '3.5rem', md: '6rem' },
                fontWeight: 900,
                lineHeight: 1,
                mb: 3,
              }}>
                Luxury Living<br />
                <Box component="span" sx={{ color: 'primary.main' }}>Redefined</Box>
              </Typography>
            </Fade>
            <Slide direction="up" in timeout={1200}>
              <Typography sx={{ fontSize: '1.4rem', mb: 6, opacity: 0.9, maxWidth: 800, mx: 'auto', color: 'text.secondary' }}>
                Exclusive off-plan & ready properties from Dubai’s most trusted developers
              </Typography>
            </Slide>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
              <Grow in timeout={1400}>
                <Button variant="contained" size="large" endIcon={<ArrowRight />} sx={{ bgcolor: 'primary.main', color: '#000', px: 6, py: 2.5, fontWeight: 700, borderRadius: 50 }}>
                  Explore Projects
                </Button>
              </Grow>
              <Grow in timeout={1600}>
                <Button variant="outlined" size="large" sx={{ borderColor: 'primary.main', color: 'primary.main', px: 6, py: 2.5, borderRadius: 50 }}>
                  Free Consultation
                </Button>
              </Grow>
            </Stack>

            {/* Stats */}
            <Grid container spacing={4} sx={{ mt: 16 }}>
              {[
                { value: '500+', label: 'Exclusive Properties', icon: <Sparkles size={40} /> },
                { value: '50+', label: 'Top Developers', icon: <Award size={40} /> },
                { value: '10K+', label: 'Happy Investors', icon: <TrendingUp size={40} /> },
                { value: 'AED 5B+', label: 'Transactions', icon: <Shield size={40} /> },
              ].map((stat, i) => (
                <Grid item xs={6} md={3} key={i}>
                  <Grow in timeout={1800 + i * 200}>
                    <Box sx={{
                      bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid',
                      borderColor: isDark ? 'rgba(195,159,88,0.3)' : 'rgba(195,159,88,0.4)',
                      borderRadius: 4,
                      p: 4,
                      textAlign: 'center',
                      transition: 'all 0.4s',
                      '&:hover': { transform: 'translateY(-8px)', borderColor: 'primary.main' }
                    }}>
                      <Box sx={{ color: 'primary.main', mb: 2 }}>{stat.icon}</Box>
                      <Typography variant="h3" sx={{
                        fontWeight: 900,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, #f0d5a0)`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}>
                        {stat.value}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>{stat.label}</Typography>
                    </Box>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* WHY DUBAI */}
      <Box sx={{ py: { xs: 12, md: 16 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ mb: 12, fontWeight: 800 }}>
            Why Invest in Dubai Real Estate?
          </Typography>
          <Grid container spacing={6}>
            {[
              { title: "0% Tax", desc: "No income tax on rental yields or capital gains", icon: <Zap size={50} /> },
              { title: "Golden Visa", desc: "10-year residency with AED 2M+ investment", icon: <Award size={50} /> },
              { title: "8-12% ROI", desc: "Highest rental yields globally", icon: <TrendingUp size={50} /> },
              { title: "World's Safest", desc: "Ranked #1 for safety & security", icon: <Shield size={50} /> },
            ].map((item, i) => (
              <Grid item xs={12} md={6} key={i}>
                <Grow in timeout={800 + i * 200}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                    <Box sx={{ color: 'primary.main', flexShrink: 0 }}>{item.icon}</Box>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{item.title}</Typography>
                      <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>{item.desc}</Typography>
                    </Box>
                  </Box>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* MODERN IMAGE-HEAVY CAMPAIGN SECTION (NO CARD!) */}
      {campaignProperty && (
        <Box sx={{
          position: 'relative',
          minHeight: { xs: '90vh', md: '100vh' },
          background: `linear-gradient(135deg, ${isDark ? '#0a1628' : '#0f1a2e'} 0%, ${isDark ? '#1a2a44' : '#1e2a3f'} 100%)`,
          overflow: 'hidden',
        }}>
          {/* Background Image */}
          <Box
            sx={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: `url(${campaignProperty.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.45) blur(3px)',
              transform: 'scale(1.05)',
            }}
          />

          {/* Content */}
          <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center' }}>
            <Grid container alignItems="center" spacing={6}>
              <Grid item xs={12} md={7}>
                <MotionBox
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <Chip label="LIMITED TIME OFFER" sx={{ bgcolor: 'primary.main', color: '#000', fontWeight: 900, fontSize: '1.1rem', py: 3, px: 5, mb: 4 }} />

                  <Typography variant="h1" sx={{
                    fontSize: { xs: '3.5rem', md: '6rem' },
                    fontWeight: 900,
                    lineHeight: 0.9,
                    mb: 3,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, #f5d592, ${theme.palette.primary.main})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    {campaignProperty.offer.title}
                  </Typography>

                  <Typography variant="h4" sx={{ color: '#fff', fontWeight: 600, mb: 3, opacity: 0.95 }}>
                    {campaignProperty.title}
                  </Typography>
                  <Typography sx={{ color: '#C39F58', fontWeight: 700, fontSize: '1.5rem', mb: 4 }}>
                    by {campaignProperty.builder.name}
                  </Typography>

                  <Box sx={{
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(195,159,88,0.3)',
                    borderRadius: 4,
                    p: 5,
                    maxWidth: 650,
                    mb: 5,
                  }}>
                    <Typography sx={{ color: '#fff', fontSize: '1.4rem', lineHeight: 1.8 }}>
                      {campaignProperty.offer.description}
                    </Typography>
                  </Box>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                    <Button size="large" endIcon={<ArrowRight size={28} />} sx={{
                      bgcolor: 'primary.main',
                      color: '#000',
                      px: 7,
                      py: 3.5,
                      borderRadius: 50,
                      fontSize: '1.3rem',
                      fontWeight: 800,
                      boxShadow: '0 20px 40px rgba(195,159,88,0.4)',
                      '&:hover': { bgcolor: '#E8D4A0', transform: 'translateY(-4px)' }
                    }}>
                      Claim Offer Now
                    </Button>
                  </Stack>

                  <MotionBox
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    sx={{ mt: 6 }}
                  >
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 3, bgcolor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', px: 5, py: 3, borderRadius: 50, border: '2px solid #C39F58' }}>
                      <CalendarCheck size={32} color="#C39F58" />
                      <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.3rem' }}>
                        Ends: {new Date(campaignProperty.offer.validUntil).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                      </Typography>
                    </Box>
                  </MotionBox>
                </MotionBox>
              </Grid>

              {/* Floating Image on Desktop */}
              <Grid item md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
                <MotionBox
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Box
                    sx={{
                      width: 500,
                      height: 650,
                      backgroundImage: `url(${campaignProperty.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '30px',
                      border: '10px solid #C39F58',
                      boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
                      transform: 'rotate(-8deg)',
                      transition: 'all 0.6s ease',
                      '&:hover': { transform: 'rotate(-4deg) scale(1.02)' },
                    }}
                  />
                </MotionBox>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      {/* FEATURED PROJECTS SWIPER */}
      <Box sx={{ py: { xs: 12, md: 16 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ mb: 10, fontWeight: 800 }}>
            Featured Luxury Projects
          </Typography>
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            coverflowEffect={{ rotate: 20, stretch: 0, depth: 100, modifier: 1, slideShadows: true }}
            autoplay={{ delay: 3000 }}
            loop
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            style={{ padding: '40px 0' }}
          >
            {properties.slice(0, 8).map(p => (
              <SwiperSlide key={p.id} style={{ width: '500px', height: '320px', borderRadius: '20px', overflow: 'hidden' }}>
                <Box sx={{ position: 'relative', height: '100%' }}>
                  <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', color: 'white', p: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{p.title}</Typography>
                    <Typography sx={{ opacity: 0.9 }}>{p.location}</Typography>
                    <Typography sx={{ color: 'primary.main', fontWeight: 700, mt: 1 }}>
                      AED {p.price.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </Box>

      {/* CONTACT FORM */}
      <Box sx={{ py: 16, bgcolor: 'background.default' }}>
        <Container maxWidth="md">
          <Box sx={{ bgcolor: 'background.paper', p: { xs: 6, md: 10 }, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h3" align="center" sx={{ mb: 3, fontWeight: 800 }}>Start Your Journey</Typography>
            <Typography align="center" sx={{ mb: 6, color: 'text.secondary', fontSize: '1.2rem' }}>
              Get personalized recommendations from our experts
            </Typography>
            <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
              {['name', 'email', 'phone', 'message'].map((f, i) => (
                <Grid item xs={12} md={f === 'message' ? 12 : 6} key={f}>
                  <TextField
                    fullWidth
                    label={f.charAt(0).toUpperCase() + f.slice(1)}
                    name={f}
                    value={formData[f]}
                    onChange={(e) => setFormData({ ...formData, [f]: e.target.value })}
                    multiline={f === 'message'}
                    rows={4}
                    sx={{
                      '& .MuiOutlinedInput-root': { bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' },
                      '& .MuiInputLabel-root': { color: 'primary.main' },
                    }}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button fullWidth variant="contained" size="large" type="submit" sx={{ py: 3, bgcolor: 'primary.main', color: '#000', fontWeight: 700, fontSize: '1.2rem' }}>
                  Get Free Consultation
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* FOOTER */}
      <Box sx={{ bgcolor: 'background.paper', py: 10, borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="xl">
          <Typography align="center" sx={{ color: 'text.secondary' }}>
            © 2025 Dubai Properties. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;