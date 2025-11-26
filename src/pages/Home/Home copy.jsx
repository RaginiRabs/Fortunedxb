import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  IconButton,
  Card,
  CardContent,
  Divider,
  Stack,
  Chip,
  Grid,
} from '@mui/material';
import {
  MapPin, Phone, Mail, Facebook, Instagram, Linkedin, PiggyBank, BadgeCheck, Building2, ShieldCheck,
  ArrowRight, Home as HomeIcon, TrendingUp, Shield, Award, Sparkles, ChevronLeft, ChevronRight, CheckCircle2
} from 'lucide-react';
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import properties from '../../Data/properties';

const Home = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <Box sx={{ bgcolor: '#0F1C2E', color: '#F4E5C3', minHeight: '100vh' }}>

      {/* Hero Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #0A1628 0%, #162236 100%)',
        py: { xs: 10, md: 16 },
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <Chip label="Trusted Since 2014" sx={{ bgcolor: 'rgba(195,159,88,0.2)', color: '#C39F58', mb: 3 }} />
            <Typography variant="h1" sx={{
              fontSize: { xs: '3rem', md: '5rem' },
              fontWeight: 800,
              lineHeight: 1,
              mb: 3
            }}>
              Luxury Living<br />
              <Box component="span" sx={{ color: '#C39F58' }}>Redefined in Dubai</Box>
            </Typography>
            <Typography sx={{ fontSize: '1.3rem', mb: 5, opacity: 0.9, maxWidth: 700, mx: 'auto' }}>
              Discover handpicked off-plan & ready properties from Dubai’s top developers
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
              <Button variant="contained" size="large" endIcon={<ArrowRight />}
                sx={{ bgcolor: '#C39F58', color: '#0A1628', px: 6, py: 2, fontWeight: 600, '&:hover': { bgcolor: '#F4E5C3' } }}>
                View Properties
              </Button>
              <Button variant="outlined" size="large"
                sx={{ borderColor: '#C39F58', color: '#C39F58', px: 6, py: 2, '&:hover': { bgcolor: 'rgba(195,159,88,0.1)' } }}>
                Get Free Consultation
              </Button>
            </Stack>
          </Box>

          {/* Enhanced Stats - Modern Gradient Style */}
          <Grid container spacing={4} sx={{ mt: 12 }}>
            {[
              { value: '500+', label: 'Exclusive Properties', icon: <Sparkles size={40} /> },
              { value: '50+', label: 'Top Developers', icon: <Award size={40} /> },
              { value: '10K+', label: 'Happy Investors', icon: <TrendingUp size={40} /> },
              { value: 'AED 5B+', label: 'Transactions Closed', icon: <Shield size={40} /> },
            ].map((stat, i) => (
              <Grid size={{ xs: 6, md: 3 }} key={i}>
                <Box sx={{
                  bgcolor: 'rgba(22, 34, 54, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(195,159,88,0.3)',
                  borderRadius: 4,
                  p: 4,
                  textAlign: 'center',
                  transition: 'all 0.4s',
                  '&:hover': { transform: 'translateY(-10px)', borderColor: '#C39F58' }
                }}>
                  <Box sx={{ color: '#C39F58', mb: 2 }}>{stat.icon}</Box>
                  <Typography variant="h3" sx={{
                    fontWeight: 800,
                    background: 'linear-gradient(45deg, #C39F58, #F4E5C3)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    {stat.value}
                  </Typography>
                  <Typography sx={{ color: '#C39F58', fontWeight: 600, mt: 1 }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* Why Invest in Dubai - Image + Modern Layout */}
      <section
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* Dark Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(0,0,0,0.65)",   // SAME AS YOUR IMAGE
            zIndex: 1,
          }}
        />

        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 2,
            py: { xs: 10, md: 14 },
            color: "#fff",
          }}
        >
          {/* Heading */}
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              mb: 10,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Why Choose Us
          </Typography>

          <Grid container spacing={8} justifyContent="center">
            {[
              {
                title: "Tax Free Returns",
                desc: "0% income tax on rental income & capital gains.",
                icon: PiggyBank,
              },
              {
                title: "Golden Visa",
                desc: "10-year residency with AED 2M+ investment.",
                icon: BadgeCheck,
              },
              {
                title: "High ROI",
                desc: "7-10% annual rental yield + 8-12% appreciation.",
                icon: TrendingUp,
              },
              {
                title: "World's Safest City",
                desc: "Ranked #1 globally for safety & security.",
                icon: ShieldCheck,
              },
              {
                title: "Booming Economy",
                desc: "Stable growth, business-friendly policies & global demand.",
                icon: Building2,
              },
            ]
              .map((item, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Box sx={{ textAlign: "center", px: 2 }}>
                    {/* ICON */}
                    <Box sx={{ fontSize: 48, color: "#E4B654", mb: 2 }}>
                      <item.icon size={48} />
                    </Box>

                    {/* TITLE */}
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.2rem",
                        color: "#E4B654",
                        mb: 1,
                      }}
                    >
                      {item.title}
                    </Typography>

                    {/* DESC */}
                    <Typography
                      sx={{
                        color: "#eaeaea",
                        fontSize: "0.95rem",
                        maxWidth: 350,
                        mx: "auto",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Container>
      </section>



      {/* Campaign Section - Special Offers */}
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 3, md: 5 },
          overflowX: 'auto',
          py: 8,
          px: { xs: 2, md: 2 },
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {properties.filter(p => p.offer).map((property) => (
          <Box
            key={property.id}
            className="offer-card"
            sx={{
              position: 'relative',
              minWidth: { xs: 300, sm: 320 },
              height: 400,
              borderRadius: '28px',
              overflow: 'hidden',

              background: 'linear-gradient(180deg, rgba(15,28,46,0.9), rgba(8,15,25,0.92))',
              border: '1px solid rgba(255,255,255,0.06)',

              boxShadow: '0 18px 45px rgba(0,0,0,0.35)',
              transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
              cursor: 'pointer',

              '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0 24px 55px rgba(0,0,0,0.45)',
              },
            }}
          >
            {/* Overlay Layer */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '100%',
                background: 'rgba(15,28,46,0.4)',
                borderRadius: '0 0 6% 6%',
                transition: 'all 0.5s ease',
                transform: 'scale(1)',

                '.offer-card:hover &': {
                  transform: 'scale(-2)',
                },
              }}
            />

            {/* Floating Orbs */}
            {[
              { top: '20%', left: '10%' },
              { top: '60%', left: '30%' },
              { top: '70%', right: '15%' },
              { top: '80%', right: '80%' },
              { top: '30%', right: '15%' },
            ].map((pos, i) => (
              <Box
                key={i}
                sx={{
                  position: 'absolute',
                  ...pos,
                  width: 50 + (i % 2) * 10,
                  height: 50 + (i % 2) * 10,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  animation: `float ${6 + (i % 2) * 2}s ease-in-out infinite`,
                  zIndex: 2,
                }}
              />
            ))}

            {/* Main Content */}
            <Box
              sx={{
                position: 'relative',
                zIndex: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 4,
                px: 3,
                textAlign: 'center',
              }}
            >
              <Box sx={{ width: '100%' }}>

                {/* 🔥 Gold Badge */}
                <Box
                  sx={{
                    background: 'rgba(12,20,34,0.9)',
                    color: '#EBD9A5',
                    px: 2,
                    py: 0.6,
                    borderRadius: '20px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    mb: 2,
                    backdropFilter: 'blur(10px)',
                    display: 'inline-block',
                    letterSpacing: '0.5px',
                  }}
                >
                  {property.offer?.title || 'Special Discount'}
                </Box>

                {/* Title */}
                <Typography
                  variant="h5"
                  sx={{
                    color: '#fff',
                    fontWeight: 800,
                    mb: 1,
                    fontSize: { xs: '1.35rem', sm: '1.55rem' },
                    textShadow: '0 3px 6px rgba(0,0,0,0.25)',
                  }}
                >
                  {property.title}
                </Typography>

                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: '1rem',
                    mb: 3,
                  }}
                >
                  by {property.builder.name}
                </Typography>

                {/* 🔥 Premium Gold Gradient Text */}
                <Typography
                  sx={{
                    background: "linear-gradient(135deg, #6A4A1D, #C39F58, #EBD9A5)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "0.95rem",
                    mt: 1,
                    mb: 3,
                    fontWeight: 700,
                    letterSpacing: '0.4px'
                  }}
                >
                  Offer ends{" "}
                  {new Date(property.offer.validUntil).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  })}
                </Typography>

                {/* Glass Box Offer Description */}
                <Box
                  sx={{
                    background: 'rgba(12,20,34,0.8)',
                    borderRadius: '16px',
                    mt: 2,
                    p: 2,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    mb: 1,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#fff',
                      fontSize: '0.95rem',
                      lineHeight: 1.5,
                      fontWeight: 500,
                    }}
                  >
                    {property.offer?.description || 'Exclusive limited time offer'}
                  </Typography>
                </Box>

              </Box>

              {/* 🔥 Premium Gold Button */}
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(135deg, #C9A350, #AF8A3C)',
                  color: '#000',
                  px: 3,
                  py: 1.2,
                  mt: 6,
                  borderRadius: '50px',
                  fontSize: '1rem',
                  fontWeight: 800,
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  maxWidth: '280px',

                  '&:hover': {
                    background: 'linear-gradient(135deg, #D4B15A, #B8923F)',
                  },
                }}
              >
                Grab This Offer
              </Button>

            </Box>

            {/* Animation */}
            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
      `}</style>

          </Box>
        ))}
      </Box>


      {/* Featured Projects - Coverflow Swiper  */}
      <Box sx={{ py: { xs: 5, md: 5 }, bgcolor: '#0A1628' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 0, fontWeight: 700 }}>
            Featured Luxury Projects
          </Typography>

          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={40}
            loop={true}
            loopedSlides={properties.length}
            speed={800}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
            className="mySwiper"
            style={{ padding: '60px 0' }}
          >
            {properties.slice(0, 8).map((property) => (
              <SwiperSlide
                key={property.id}
                style={{
                  width: '480px',
                  height: '280px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                }}
              >
                <Box sx={{ position: 'relative', width: '100%', height: '100%', bgcolor: '#0f1c2e' }}>
                  <img
                    src={property.image}
                    alt={property.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />

                  {/* Status Badge */}
                  <Box sx={{
                    position: 'absolute',
                    top: 22,
                    left: -12,
                    bgcolor: '#C39F58',
                    color: '#0A1628',
                    px: 4.5,
                    py: 1.7,
                    borderRadius: '0 40px 40px 0',
                    fontWeight: 900,
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1.2px',

                    clipPath: 'polygon(0 0, 92% 0, 100% 40%, 92% 90%, 0 90%)',

                    boxShadow: '14px 14px 35px rgba(0,0,0,0.55)',
                    borderRight: '4px solid #F4E5C3',
                  }}>
                    {property.status}
                  </Box>

                  {/* Bottom Overlay */}
                  <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: 'rgba(10, 22, 40, 0.55)',
                    color: 'white',
                    p: 0.5,
                    // pt: 8,
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>
                      {property.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, }}>
                      <MapPin size={16} />
                      <Typography sx={{ fontSize: '0.9rem' }}>{property.location}</Typography>
                    </Box>
                    <Typography sx={{ color: '#C39F58', fontWeight: 600, mt: 1.5, fontSize: '1rem' }}>
                      Starting from AED {property.price.toLocaleString()}
                    </Typography>
                  </Box>


                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </Box>



      {/* Contact Form */}
      <Box sx={{ bgcolor: '#0A1628', py: 12 }}>
        <Container maxWidth="md">
          <Box sx={{ bgcolor: '#162236', p: { xs: 5, md: 8 }, borderRadius: 4, border: '1px solid rgba(195,159,88,0.3)' }}>
            <Typography variant="h3" sx={{ textAlign: 'center', mb: 3 }}>Start Your Journey</Typography>
            <Typography sx={{ textAlign: 'center', color: '#C39F58', mb: 6 }}>Get personalized property recommendations</Typography>
            <Grid container spacing={3}>
              {['name', 'email', 'phone', 'message'].map((field) => (
                <Grid size={{ xs: 12, md: field === 'message' ? 12 : 6 }} key={field}>
                  <TextField
                    fullWidth
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    name={field}
                    value={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    multiline={field === 'message'}
                    rows={4}
                    sx={{
                      '& .MuiInputLabel-root': { color: '#C39F58' },
                      '& .MuiInputBase-root': { color: '#F4E5C3', bgcolor: 'rgba(22,34,54,0.5)' },
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(195,159,88,0.4)' },
                    }}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button fullWidth variant="contained" size="large" onClick={handleSubmit}
                  sx={{ bgcolor: '#C39F58', color: '#0A1628', py: 2, fontWeight: 600, '&:hover': { bgcolor: '#F4E5C3' } }}>
                  Get Free Consultation
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#0A1628', py: 8, borderTop: '1px solid rgba(195,159,88,0.2)' }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} sx={{ mb: 6 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <HomeIcon size={36} color="#C39F58" />
                <Typography variant="h5" sx={{ color: '#C39F58', fontWeight: 700 }}>Dubai Properties</Typography>
              </Box>
              <Typography sx={{ lineHeight: 1.8 }}>Your trusted partner for luxury real estate investments in Dubai.</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ color: '#C39F58', mb: 3 }}>Quick Links</Typography>
              <Stack spacing={1}>
                {['Properties', 'Developers', 'Golden Visa', 'Blog', 'Contact'].map(l => (
                  <Typography key={l} sx={{ cursor: 'pointer', '&:hover': { color: '#C39F58' } }}>{l}</Typography>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ color: '#C39F58', mb: 3 }}>Contact</Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', gap: 2 }}><Phone color="#C39F58" /> +971 50 123 4567</Box>
                <Box sx={{ display: 'flex', gap: 2 }}><Mail color="#C39F58" /> info@dubailuxuryproperties.ae</Box>
                <Box sx={{ display: 'flex', gap: 2 }}><MapPin color="#C39F58" /> Business Bay, Dubai</Box>
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ borderColor: 'rgba(195,159,88,0.2)' }} />
          <Typography sx={{ textAlign: 'center', color: '#C39F58', mt: 4 }}>
            © 2025 Dubai Properties. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;