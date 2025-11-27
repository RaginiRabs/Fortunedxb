import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
} from '@mui/material';
import {
  Shield,
  Globe,
  TrendingUp,
  Calculator,
  Wallet,
  LineChart,
  ArrowUpRight,
} from 'lucide-react';

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = '', prefix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime;
          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOut * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={counterRef}>{prefix}{count}{suffix}</span>;
};

// Three Key Stats
const keyStats = [
  {
    icon: Shield,
    value: 0,
    suffix: '%',
    label: 'Property Tax',
    subtext: 'Tax-free ownership',
  },
  {
    icon: TrendingUp,
    value: 10,
    suffix: '%',
    prefix: '',
    label: 'Rental ROI',
    subtext: 'High yield returns',
  },
  {
    icon: Globe,
    value: 100,
    suffix: '%',
    label: 'Ownership',
    subtext: 'Full foreign rights',
  },
];

// Two Mini Benefits
const miniBenefits = [
  {
    icon: Wallet,
    title: 'Flexible Payments',
    description: 'Easy installment plans up to handover',
  },
  {
    icon: LineChart,
    title: 'Strong Growth',
    description: 'Consistent capital appreciation',
  },
];

const WhyInvestSection = ({ setRoiCalculatorOpen }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 6, md: 8 },
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Background Accent */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(198, 169, 98, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg">
        {/* Main Content Row */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: { xs: 4, lg: 6 },
            alignItems: 'center',
          }}
        >
          {/* Left - Image Section */}
          <Box
            sx={{
              flex: { lg: '0 0 42%' },
              width: '100%',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                aspectRatio: { xs: '16/10', lg: '4/3' },
                boxShadow: '0 20px 50px rgba(30, 58, 95, 0.12)',
              }}
            >
              {/* Main Image */}
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&q=85"
                alt="Dubai Skyline"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />

              {/* Overlay Gradient */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 50%, rgba(30, 58, 95, 0.4) 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Floating Badge */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '100px',
                  px: 2,
                  py: 1,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: '#10B981',
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.5 },
                    },
                  }}
                />
                <Typography
                  sx={{
                    color: '#1E3A5F',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                  }}
                >
                  #1 Global Investment Hub
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right - Content Section */}
          <Box
            sx={{
              flex: 1,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: '0.2s',
            }}
          >
            {/* Header */}
            <Box sx={{ mb: 4 }}>
              <Typography
                sx={{
                  color: '#C6A962',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  mb: 1,
                }}
              >
                Smart Investment
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  color: '#1E3A5F',
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 600,
                  fontSize: { xs: '1.6rem', md: '2rem' },
                  lineHeight: 1.2,
                  mb: 1.5,
                }}
              >
                Why Dubai{' '}
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Real Estate?
                </Box>
              </Typography>

              <Typography
                sx={{
                  color: '#64748B',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  maxWidth: 400,
                }}
              >
                Tax-free returns, full ownership rights, and world-class lifestyle 
                await global investors.
              </Typography>
            </Box>

            {/* Three Stats Row */}
            <Box
              sx={{
                display: 'flex',
                gap: { xs: 2, md: 3 },
                mb: 4,
              }}
            >
              {keyStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Box
                    key={index}
                    sx={{
                      flex: 1,
                      textAlign: 'center',
                      p: { xs: 2, md: 2.5 },
                      borderRadius: 3,
                      bgcolor: 'white',
                      border: '1px solid #F0F0F0',
                      transition: 'all 0.3s ease',
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      transitionDelay: `${0.3 + index * 0.1}s`,
                      '&:hover': {
                        borderColor: '#C6A962',
                        boxShadow: '0 8px 25px rgba(30, 58, 95, 0.08)',
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    {/* Icon */}
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        bgcolor: 'rgba(198, 169, 98, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 1.5,
                      }}
                    >
                      <Icon size={16} color="#C6A962" strokeWidth={2} />
                    </Box>

                    {/* Value */}
                    <Typography
                      sx={{
                        color: '#1E3A5F',
                        fontWeight: 700,
                        fontSize: { xs: '1.5rem', md: '2rem' },
                        lineHeight: 1,
                        fontFamily: '"Playfair Display", serif',
                      }}
                    >
                      <AnimatedCounter
                        end={stat.value}
                        suffix={stat.suffix}
                        prefix={stat.prefix || ''}
                      />
                    </Typography>

                    {/* Label */}
                    <Typography
                      sx={{
                        color: '#1E3A5F',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        mt: 0.5,
                      }}
                    >
                      {stat.label}
                    </Typography>

                    {/* Subtext */}
                    <Typography
                      sx={{
                        color: '#94A3B8',
                        fontSize: '0.6rem',
                        mt: 0.25,
                      }}
                    >
                      {stat.subtext}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            {/* Two Mini Benefits */}
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                mb: 4,
              }}
            >
              {miniBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      opacity: isVisible ? 1 : 0,
                      transitionDelay: `${0.6 + index * 0.1}s`,
                      transition: 'all 0.6s ease',
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 2,
                        bgcolor: 'rgba(30, 58, 95, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={14} color="#1E3A5F" strokeWidth={2} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          color: '#1E3A5F',
                          fontWeight: 600,
                          fontSize: '0.8rem',
                          lineHeight: 1.2,
                        }}
                      >
                        {benefit.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: '#94A3B8',
                          fontSize: '0.7rem',
                          lineHeight: 1.4,
                        }}
                      >
                        {benefit.description}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {/* CTA Button */}
            <Box
              sx={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease',
                transitionDelay: '0.8s',
              }}
            >
              <Button
                variant="contained"
                onClick={() => setRoiCalculatorOpen(true)}
                endIcon={<ArrowUpRight size={16} />}
                sx={{
                  background: 'linear-gradient(135deg, #1E3A5F 0%, #2D4A6F 100%)',
                  color: 'white',
                  px: 3,
                  py: 1.25,
                  borderRadius: '100px',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  textTransform: 'none',
                  boxShadow: '0 4px 15px rgba(30, 58, 95, 0.25)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2D4A6F 0%, #1E3A5F 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(30, 58, 95, 0.3)',
                  },
                  '& .MuiButton-endIcon': {
                    ml: 1,
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover .MuiButton-endIcon': {
                    transform: 'translate(2px, -2px)',
                  },
                }}
              >
                <Calculator size={16} style={{ marginRight: 8 }} />
                Calculate Your ROI
              </Button>

              {/* Trust Text */}
              <Typography
                sx={{
                  color: '#94A3B8',
                  fontSize: '0.65rem',
                  mt: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <Shield size={12} color="#10B981" />
                Trusted by 50,000+ investors worldwide
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default WhyInvestSection;