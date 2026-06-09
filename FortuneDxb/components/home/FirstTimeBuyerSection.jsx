'use client';
import {
  Box,
  Container,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Gift,
  FileText,
  Calculator,
  Scale,
  Headphones,
  Languages,
  Rocket,
} from 'lucide-react';

const benefits = [
  { icon: FileText, text: 'Step-by-step guides' },
  { icon: Calculator, text: 'Payment calculators' },
  { icon: Scale, text: 'Legal support' },
  { icon: Headphones, text: 'Dedicated consultant' },
  { icon: Languages, text: '15+ languages' },
];

const steps = [
  {
    number: '01',
    label: 'Property Selection',
    desc: 'Browse and shortlist your dream properties',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
  },
  {
    number: '02',
    label: 'Reservation',
    desc: 'Secure with a small deposit (AED 10-50K)',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
  },
  {
    number: '03',
    label: 'SPA Signing',
    desc: 'Sign Sales Purchase Agreement',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop',
  },
  {
    number: '04',
    label: 'Payment Plan',
    desc: 'Follow developer payment schedule',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
  },
  {
    number: '05',
    label: 'Handover',
    desc: 'Receive keys to your new property',
    image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=400&h=300&fit=crop',
  },
];

const FirstTimeBuyerSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Hero Banner Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: 420, sm: 450, md: 480 },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Background Image */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=900&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Dark Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: {
              xs: `linear-gradient(180deg, ${alpha(theme.palette.navy.main, 0.9)} 0%, ${alpha(theme.palette.navy.main, 0.85)} 100%)`,
              md: `linear-gradient(90deg, ${alpha(theme.palette.navy.main, 0.95)} 0%, ${alpha(theme.palette.navy.main, 0.8)} 40%, ${alpha(theme.palette.navy.main, 0.4)} 70%, ${alpha(theme.palette.navy.main, 0.2)} 100%)`,
            },
          }}
        />

        {/* Gold Accent Glow */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '-5%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.gold.main, 0.15)} 0%, transparent 70%)`,
            pointerEvents: 'none',
            display: { xs: 'none', md: 'block' },
          }}
        />

       <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 8 } }}>
          <Box sx={{ maxWidth: { xs: '100%', md: 580 } }}>
            {/* Badge */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: alpha(theme.palette.gold.main, 0.15),
                border: `1px solid ${alpha(theme.palette.gold.main, 0.4)}`,
                borderRadius: 1,
                px: 2,
                py: 0.6,
                mb: 2.5,
              }}
            >
              <Gift size={14} color={theme.palette.gold.main} />
              <Typography
                sx={{
                  color: 'gold.main',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: 1,
                  fontFamily: '"Quicksand", sans-serif',
                  fontStyle: 'italic',
                }}
              >
                FIRST-TIME BUYERS
              </Typography>
            </Box>

            {/* Main Heading */}
            <Typography
              sx={{
                color: 'common.white',
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
                fontWeight: 600,
                fontSize: { xs: '1.5rem', md: '1.8rem' },
                lineHeight: 1.2,
                mb: 2,
              }}
            >
              Your First Step to{' '}
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.pale} 50%, ${theme.palette.gold.main} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Dubai Property
              </Box>
            </Typography>

            {/* Subtitle */}
            <Typography
              sx={{
                color: alpha(theme.palette.common.white, 0.75),
                fontSize: { xs: '0.9rem', md: '1rem' },
                lineHeight: 1.7,
                mb: 3,
                maxWidth: 480,
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
              }}
            >
              Expert guidance, dedicated support, and a seamless buying experience
              for first-time investors in Dubai's thriving real estate market.
            </Typography>

            {/* Benefits Pills */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                mb: 3.5,
              }}
            >
              {benefits.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                    px: 1.5,
                    py: 0.75,
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.common.white, 0.08),
                    border: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.gold.main, 0.15),
                      borderColor: alpha(theme.palette.gold.main, 0.4),
                    },
                  }}
                >
                  <item.icon size={14} color={theme.palette.gold.main} />
                  <Typography
                    sx={{
                      color: 'common.white',
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      fontFamily: '"Quicksand", sans-serif',
                      fontStyle: 'italic',
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* CTA Button */}
            <Button
              variant="contained"
              endIcon={<Rocket size={18} color={theme.palette.common.white} />}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.dark} 100%)`,
                color: 'common.white',
                px: { xs: 3, md: 4 },
                py: { xs: 1.25, md: 1.5 },
                borderRadius: 1,
                fontWeight: 700,
                fontSize: { xs: '0.85rem', md: '0.9rem' },
                textTransform: 'none',
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
                boxShadow: `0 8px 30px ${alpha(theme.palette.gold.main, 0.35)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: `0 12px 40px ${alpha(theme.palette.gold.main, 0.5)}`,
                },
              }}
            >
              Start Your Journey
            </Button>

            {/* Trust Indicator */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mt: 3,
              }}
            >
              <Box sx={{ display: 'flex' }}>
                {[1, 2, 3, 4].map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      bgcolor: 'gold.main',
                      border: `2px solid ${alpha(theme.palette.navy.main, 0.8)}`,
                      ml: i > 0 ? -1 : 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      color: 'common.white',
                      fontFamily: '"Quicksand", sans-serif',
                      fontStyle: 'italic',
                    }}
                  >
                    {i < 3 ? ['J', 'M', 'S'][i] : '+'}
                  </Box>
                ))}
              </Box>
              <Typography
                sx={{
                  color: alpha(theme.palette.common.white, 0.6),
                  fontSize: '0.75rem',
                  fontFamily: '"Quicksand", sans-serif',
                  fontStyle: 'italic',
                }}
              >
                <Box component="span" sx={{ color: 'gold.main', fontWeight: 700 }}>
                  5,000+
                </Box>{' '}
                first-time buyers helped
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* 5-Step Process Section */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          bgcolor: 'background.subtle',
          position: 'relative',
        }}
      >
        {/* Subtle Pattern */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.03,
            backgroundImage: `radial-gradient(${theme.palette.navy.main} 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />

       <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Section Header */}
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
            <Typography
              sx={{
                color: 'gold.main',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase',
                mb: 1,
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
              }}
            >
              How It Works
            </Typography>
            <Typography
              sx={{
                color: 'text.primary',
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
                fontWeight: 600,
                fontSize: { xs: '1.5rem', md: '1.8rem' },
              }}
            >
              Simple{' '}
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.dark} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                5-Step Process
              </Box>
            </Typography>
          </Box>

          {/* Steps Container */}
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 2, md: 2.5 },
              overflowX: { xs: 'auto', lg: 'visible' },
              pb: { xs: 2, lg: 0 },
              px: { xs: 1, lg: 0 },
              scrollSnapType: 'x mandatory',
              '&::-webkit-scrollbar': {
                height: 6,
              },
              '&::-webkit-scrollbar-track': {
                bgcolor: 'divider',
                borderRadius: 1,
              },
              '&::-webkit-scrollbar-thumb': {
                bgcolor: 'gold.main',
                borderRadius: 1,
              },
            }}
          >
            {steps.map((step, index) => (
              <Box
                key={index}
                sx={{
                  minWidth: { xs: 200, sm: 220, md: 'auto' },
                  flex: { lg: 1 },
                  position: 'relative',
                  scrollSnapAlign: 'start',
                }}
              >
                {/* Connector Line - Desktop Only */}
                {index < steps.length - 1 && (
                  <Box
                    sx={{
                      display: { xs: 'none', lg: 'block' },
                      position: 'absolute',
                      top: 55,
                      right: -20,
                      width: 40,
                      height: 2,
                      background: `linear-gradient(90deg, ${theme.palette.gold.main} 0%, ${theme.palette.divider} 100%)`,
                      zIndex: 1,
                    }}
                  />
                )}

                {/* Step Card */}
                <Box
                  sx={{
                    p: { xs: 2, md: 2.5 },
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    textAlign: 'center',
                    height: '100%',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: 'gold.main',
                      transform: 'translateY(-8px)',
                      boxShadow: `0 20px 40px ${alpha(theme.palette.gold.main, 0.15)}`,
                      '& .step-image': {
                        transform: 'scale(1.1)',
                        borderColor: 'gold.dark',
                      },
                      '& .step-number': {
                        bgcolor: 'gold.main',
                        color: 'common.white',
                      },
                    },
                  }}
                >
                  {/* Step Image */}
                  <Box
                    className="step-image"
                    sx={{
                      width: { xs: 70, md: 80 },
                      height: { xs: 70, md: 80 },
                      borderRadius: '50%',
                      overflow: 'hidden',
                      mx: 'auto',
                      mb: 2,
                      border: '3px solid',
                      borderColor: 'gold.main',
                      boxShadow: `0 8px 25px ${alpha(theme.palette.gold.main, 0.2)}`,
                      transition: 'all 0.4s ease',
                    }}
                  >
                    <Box
                      component="img"
                      src={step.image}
                      alt={step.label}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>

                  {/* Step Number Badge */}
                  <Box
                    className="step-number"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: 'navy.main',
                      color: 'gold.main',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      mb: 1.5,
                      transition: 'all 0.3s ease',
                      fontFamily: '"Quicksand", sans-serif',
                      fontStyle: 'italic',
                    }}
                  >
                    {step.number}
                  </Box>

                  {/* Step Label */}
                  <Typography
                    sx={{
                      color: 'text.primary',
                      fontWeight: 700,
                      fontSize: { xs: '0.85rem', md: '0.95rem' },
                      mb: 0.5,
                      fontFamily: '"Quicksand", sans-serif',
                      fontStyle: 'italic',
                    }}
                  >
                    {step.label}
                  </Typography>

                  {/* Step Description */}
                  <Typography
                    sx={{
                      color: 'text.secondary',
                      fontSize: { xs: '0.7rem', md: '0.75rem' },
                      lineHeight: 1.5,
                      fontFamily: '"Quicksand", sans-serif',
                      fontStyle: 'italic',
                    }}
                  >
                    {step.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Mobile Scroll Hint */}
          <Box
            sx={{
              display: { xs: 'flex', lg: 'none' },
              justifyContent: 'center',
              alignItems: 'center',
              gap: 0.5,
              mt: 2,
            }}
          >
            <Box
              sx={{
                width: 20,
                height: 4,
                borderRadius: 1,
                bgcolor: 'gold.main',
              }}
            />
            <Box
              sx={{
                width: 8,
                height: 4,
                borderRadius: 1,
                bgcolor: 'divider',
              }}
            />
            <Box
              sx={{
                width: 8,
                height: 4,
                borderRadius: 1,
                bgcolor: 'divider',
              }}
            />
            <Typography
              sx={{
                color: 'text.disabled',
                fontSize: '0.6rem',
                ml: 1,
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
              }}
            >
              Swipe to explore
            </Typography>
          </Box>

          {/* Bottom CTA - Mobile */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'center',
              mt: 4,
            }}
          >
            <Button
              variant="outlined"
              endIcon={<Rocket size={16} />}
              sx={{
                borderColor: 'text.primary',
                color: 'text.primary',
                px: 3,
                py: 1,
                borderRadius: 1,
                fontWeight: 600,
                fontSize: '0.8rem',
                textTransform: 'none',
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
                '&:hover': {
                  borderColor: 'gold.main',
                  bgcolor: alpha(theme.palette.gold.main, 0.05),
                },
              }}
            >
              Get Started
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default FirstTimeBuyerSection;