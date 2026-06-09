'use client';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Building2,
  FileText,
  ArrowRight,
  Phone,
  Key,
  Search,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';

// Simple Steps
const steps = [
  { 
    num: '01', 
    title: 'Research & Planning', 
    desc: 'Define your investment goals, set budget, and understand market dynamics.', 
    icon: Search,
    highlights: ['Set objectives', 'Budget planning', 'Market research'],
  },
  { 
    num: '02', 
    title: 'Property Selection', 
    desc: 'Choose the right property type and location for your investment strategy.', 
    icon: Building2,
    highlights: ['Location analysis', 'Property comparison', 'Developer check'],
  },
  { 
    num: '03', 
    title: 'Documentation', 
    desc: 'Complete legal paperwork including SPA signing and DLD registration.', 
    icon: FileText,
    highlights: ['SPA agreement', 'DLD registration', 'Payment process'],
  },
  { 
    num: '04', 
    title: 'Handover', 
    desc: 'Final inspection, key collection, and title deed transfer.', 
    icon: Key,
    highlights: ['Inspection', 'Key collection', 'Title deed'],
  },
];

export default function InvestmentGuidePage() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: { md: 'fixed' },
        }}
      />

      {/* Dark Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, ${alpha(theme.palette.navy.main, 0.96)} 0%, ${alpha(theme.palette.navy.main, 0.9)} 50%, ${alpha(theme.palette.navy.main, 0.96)} 100%)`,
        }}
      />

      {/* Subtle Glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.gold.main, 0.08)} 0%, transparent 60%)`,
          filter: 'blur(60px)',
        }}
      />

     <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, pt: { xs: 14, md: 18 }, pb: { xs: 8, md: 12 } }}>
        
        {/* ==================== HERO ==================== */}
        <Box sx={{ maxWidth: 700, mb: { xs: 8, md: 12 } }}>
          {/* Badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 0.75,
              bgcolor: alpha(theme.palette.gold.main, 0.1),
              borderRadius: 5,
              border: `1px solid ${alpha(theme.palette.gold.main, 0.2)}`,
              mb: 3,
            }}
          >
            <Sparkles size={14} color={theme.palette.gold.main} />
            <Typography
              sx={{
                color: 'gold.main',
                fontSize: '0.7rem',
                fontWeight: 600,
                fontFamily: '"Quicksand", sans-serif',
                letterSpacing: 2,
              }}
            >
              INVESTOR GUIDE
            </Typography>
          </Box>

          {/* Title */}
          <Typography
            variant="h1"
            sx={{
              color: 'common.white',
              fontFamily: '"Quicksand", sans-serif',
              fontWeight: 700,
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
              lineHeight: 1.1,
              mb: 3,
            }}
          >
            Your Path to{' '}
            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.light} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Dubai Property
            </Box>
          </Typography>

          <Typography
            sx={{
              color: alpha(theme.palette.common.white, 0.6),
              fontSize: { xs: '1rem', md: '1.1rem' },
              fontFamily: '"Quicksand", sans-serif',
              lineHeight: 1.8,
              mb: 4,
              maxWidth: 550,
            }}
          >
            Everything you need to know about investing in Dubai real estate — tax benefits, Golden Visa, and seamless buying process.
          </Typography>

          {/* CTA Buttons */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              component={Link}
              href="/projects"
              variant="contained"
              endIcon={<ArrowRight size={18} />}
              sx={{
                bgcolor: 'gold.main',
                color: 'navy.main',
                px: 4,
                py: 1.75,
                borderRadius: 2,
                fontFamily: '"Quicksand", sans-serif',
                fontWeight: 700,
                fontSize: '0.9rem',
                textTransform: 'none',
                boxShadow: `0 8px 30px ${alpha(theme.palette.gold.main, 0.3)}`,
                '&:hover': {
                  bgcolor: 'gold.light',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              View Properties
            </Button>
            <Button
              component={Link}
              href="/contact"
              variant="outlined"
              startIcon={<Phone size={18} />}
              sx={{
                borderColor: alpha(theme.palette.common.white, 0.25),
                borderWidth: 2,
                color: 'common.white',
                px: 4,
                py: 1.75,
                borderRadius: 2,
                fontFamily: '"Quicksand", sans-serif',
                fontWeight: 600,
                fontSize: '0.9rem',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: alpha(theme.palette.common.white, 0.05),
                  borderColor: 'gold.main',
                  borderWidth: 2,
                },
              }}
            >
              Talk to Expert
            </Button>
          </Box>
        </Box>

        {/* ==================== STATS ==================== */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: { xs: 3, md: 0 },
            mb: { xs: 8, md: 12 },
            pb: { xs: 4, md: 6 },
            borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
          }}
        >
          {[
            { value: '0%', label: 'Property Tax', sub: 'Tax-free investment' },
            { value: '6-10%', label: 'Rental ROI', sub: 'Annual returns' },
            { value: '2M+', label: 'Golden Visa', sub: 'AED investment' },
            { value: '100%', label: 'Freehold', sub: 'Full ownership' },
          ].map((stat, i) => (
            <Box
              key={i}
              sx={{
                px: { md: 3 },
                borderRight: { md: i < 3 ? `1px solid ${alpha(theme.palette.common.white, 0.08)}` : 'none' },
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Quicksand", sans-serif',
                  fontWeight: 700,
                  fontSize: { xs: '2.25rem', md: '2.75rem' },
                  color: 'gold.main',
                  lineHeight: 1,
                  mb: 0.5,
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Quicksand", sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: alpha(theme.palette.common.white, 0.85),
                  mb: 0.25,
                }}
              >
                {stat.label}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Quicksand", sans-serif',
                  fontSize: '0.75rem',
                  color: alpha(theme.palette.common.white, 0.4),
                }}
              >
                {stat.sub}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* ==================== STEPS TIMELINE ==================== */}
        <Box>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 5 }}>
            <Box sx={{ width: 40, height: 2, bgcolor: 'gold.main', borderRadius: 1 }} />
            <Typography
              sx={{
                color: 'gold.main',
                fontSize: '0.75rem',
                fontWeight: 600,
                fontFamily: '"Quicksand", sans-serif',
                letterSpacing: 3,
              }}
            >
              HOW IT WORKS
            </Typography>
          </Box>

          {/* Steps */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {steps.map((step, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: { xs: 3, md: 5 },
                  pb: index < steps.length - 1 ? { xs: 5, md: 6 } : 0,
                  position: 'relative',
                  // Vertical line
                  '&::before': index < steps.length - 1 ? {
                    content: '""',
                    position: 'absolute',
                    left: { xs: 27, md: 35 },
                    top: { xs: 60, md: 76 },
                    bottom: 0,
                    width: 2,
                    bgcolor: alpha(theme.palette.gold.main, 0.15),
                    borderRadius: 1,
                  } : {},
                }}
              >
                {/* Step Circle */}
                <Box
                  sx={{
                    width: { xs: 56, md: 72 },
                    height: { xs: 56, md: 72 },
                    borderRadius: '50%',
                    border: `2px solid ${alpha(theme.palette.gold.main, 0.3)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    bgcolor: alpha(theme.palette.navy.main, 0.8),
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'gold.main',
                      bgcolor: alpha(theme.palette.gold.main, 0.1),
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Quicksand", sans-serif',
                      fontWeight: 700,
                      fontSize: { xs: '1rem', md: '1.2rem' },
                      color: 'gold.main',
                    }}
                  >
                    {step.num}
                  </Typography>
                </Box>

                {/* Content */}
                <Box sx={{ pt: { xs: 0.5, md: 1.5 }, flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.gold.main, 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <step.icon size={18} color={theme.palette.gold.main} />
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: '"Quicksand", sans-serif',
                        fontWeight: 700,
                        fontSize: { xs: '1.1rem', md: '1.35rem' },
                        color: 'common.white',
                      }}
                    >
                      {step.title}
                    </Typography>
                  </Box>
                  
                  <Typography
                    sx={{
                      fontFamily: '"Quicksand", sans-serif',
                      fontSize: '0.9rem',
                      color: alpha(theme.palette.common.white, 0.5),
                      lineHeight: 1.7,
                      mb: 2,
                      maxWidth: 480,
                    }}
                  >
                    {step.desc}
                  </Typography>

                  {/* Highlights */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                    {step.highlights.map((highlight, hi) => (
                      <Box
                        key={hi}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.75,
                        }}
                      >
                        <CheckCircle2 size={14} color={theme.palette.gold.main} />
                        <Typography
                          sx={{
                            fontFamily: '"Quicksand", sans-serif',
                            fontSize: '0.8rem',
                            color: alpha(theme.palette.common.white, 0.6),
                          }}
                        >
                          {highlight}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ==================== BOTTOM CTA ==================== */}
        <Box
          sx={{
            mt: { xs: 8, md: 12 },
            pt: { xs: 5, md: 6 },
            borderTop: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { md: 'center' },
            justifyContent: 'space-between',
            gap: 4,
          }}
        >
          <Box>
            <Typography
              sx={{
                color: 'common.white',
                fontFamily: '"Quicksand", sans-serif',
                fontWeight: 700,
                fontSize: { xs: '1.35rem', md: '1.6rem' },
                mb: 0.75,
              }}
            >
              Ready to start your{' '}
              <Box component="span" sx={{ color: 'gold.main' }}>
                investment journey?
              </Box>
            </Typography>
            <Typography
              sx={{
                color: alpha(theme.palette.common.white, 0.5),
                fontFamily: '"Quicksand", sans-serif',
                fontSize: '0.9rem',
              }}
            >
              Get personalized advice from our Dubai real estate experts
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              endIcon={<ArrowRight size={18} />}
              sx={{
                bgcolor: 'common.white',
                color: 'navy.main',
                px: 3.5,
                py: 1.5,
                borderRadius: 2,
                fontFamily: '"Quicksand", sans-serif',
                fontWeight: 700,
                fontSize: '0.9rem',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: 'gold.main',
                },
              }}
            >
              Book Free Consultation
            </Button>
            <Button
              component={Link}
              href="tel:+971582335969"
              variant="outlined"
              startIcon={<Phone size={18} />}
              sx={{
                borderColor: alpha(theme.palette.common.white, 0.2),
                color: 'common.white',
                px: 3,
                py: 1.5,
                borderRadius: 2,
                fontFamily: '"Quicksand", sans-serif',
                fontWeight: 600,
                fontSize: '0.9rem',
                textTransform: 'none',
                '&:hover': {
                  borderColor: 'gold.main',
                  bgcolor: alpha(theme.palette.gold.main, 0.05),
                },
              }}
            >
              +971 58 233 5969
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}