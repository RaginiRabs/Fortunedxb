'use client';
import { useRef, useEffect, useState } from 'react';
import { Box, Typography, Container, Grid, keyframes, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Award, Eye, Target, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { 
  Breadcrumbs, 
  Link as MuiLink 
} from '@mui/material';

// ============ KEYFRAME ANIMATIONS ============
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeInLeft = keyframes`
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
`;

const fadeInRight = keyframes`
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
`;

// ============ IMAGES ============
const IMAGES = {
  dubai5: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1200&auto=format&fit=crop',
  mission: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
  vision: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
};

const ACHIEVEMENTS = [
  'https://fortunerealtydxb.com/wp-content/uploads/2025/11/1-2.jpg',
  'https://fortunerealtydxb.com/wp-content/uploads/2025/11/2-2.jpg',
  'https://fortunerealtydxb.com/wp-content/uploads/2025/11/3-1.jpg',
  'https://fortunerealtydxb.com/wp-content/uploads/2025/11/4.jpg',
  'https://fortunerealtydxb.com/wp-content/uploads/2025/11/5.jpg',
];

// ============ HOOK ============
const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

// ============ SIMPLE HEADER SECTION ============
const SimpleAboutHeader = () => {
  const { ref, isVisible } = useScrollAnimation();
  const theme = useTheme();

  return (
    <Box
      ref={ref}
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.navy.main} 0%, ${theme.palette.navy.light} 100%)`,
        pt: { xs: 12, md: 20 },
        pb: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="xl">

        {/* Title */}
        <Typography
          variant="h1"
          sx={{
            color: 'common.white',
            fontFamily: '"Quicksand", sans-serif',
            fontWeight: 700,
            fontSize: { xs: '1.75rem', md: '2.5rem' },
            mb: 1,
            animation: isVisible ? `${fadeInUp} 0.6s ease-out 0.1s both` : 'none',
          }}
        >
         Discover{' '}
          <Box
            component="span"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.pale} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Fortune realty LLC
          </Box>
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            color: (theme) => alpha(theme.palette.common.white, 0.7),
            fontSize: '0.95rem',
            fontFamily: '"Quicksand", sans-serif',
            maxWidth: 600,
            mb: 0,
            animation: isVisible ? `${fadeInUp} 0.6s ease-out 0.2s both` : 'none',
          }}
        >
          Learn about Fortune Realty's journey, values, and commitment to excellence in Dubai real estate
        </Typography>
      </Container>
    </Box>
  );
};

// ============ ABOUT SECTION ============
const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const theme = useTheme();

  return (
    <Box ref={ref} sx={{ py: { xs: 8, md: 10, lg: 10 }, bgcolor: 'background.default' }}>
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ pr: { md: 4 } }}>
              <Typography
                sx={{
                  color: 'gold.main',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  mb: 2,
                  animation: isVisible ? `${fadeInUp} 0.6s ease-out` : 'none',
                  opacity: isVisible ? 1 : 0
                }}
              >
                Who We Are
              </Typography>
              
              <Typography 
                variant="h2" 
                sx={{ 
                  fontSize: { xs: '2rem', md: '2.8rem' }, 
                  fontFamily: '"Playfair Display", Georgia, serif',
                  color: 'text.primary',
                  fontWeight: 400,
                  mb: 4,
                  lineHeight: 1.2,
                  animation: isVisible ? `${fadeInUp} 0.6s ease-out 0.1s both` : 'none'
                }}
              >
                Driven by Real Estate{' '}
                <Box component="span" sx={{ color: 'gold.main', fontStyle: 'italic' }}>
                  Excellence
                </Box>
              </Typography>
              
              <Typography
                sx={{
                  color: 'text.primary',
                  fontSize: '1rem',
                  lineHeight: 2,
                  mb: 3,
                  animation: isVisible ? `${fadeInUp} 0.6s ease-out 0.2s both` : 'none' 
                }}
              >
                At Fortune Realty LLC, we take pride in being a global name in Dubai real estate — trusted by investors across 20+ countries. With years of expertise in premium off-plan and ready properties, we deliver opportunities that combine luxury living with exceptional returns.
              </Typography>
              
              <Typography
                sx={{
                  color: 'text.primary',
                  fontSize: '0.95rem',
                  lineHeight: 2,
                  mb: 4,
                  animation: isVisible ? `${fadeInUp} 0.6s ease-out 0.3s both` : 'none' 
                }}
              >
                Our team of professionals ensures transparency, reliability, and end-to-end support — from consultation to handover. Whether you're expanding your portfolio or making your first Dubai investment, Fortune Realty stands as your dependable partner.
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, animation: isVisible ? `${fadeInUp} 0.6s ease-out 0.4s both` : 'none' }}>
                {['Premium Off-Plan & Ready Properties', 'End-to-End Investment Support', 'Trusted by Global Investors'].map((item, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: alpha(theme.palette.gold.main, 0.08),
                      border: `1px solid ${alpha(theme.palette.gold.main, 0.19)}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'gold.main' }} />
                    </Box>
                    <Typography sx={{ color: 'text.primary', fontWeight: 500, fontSize: '0.95rem' }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Box 
              sx={{ 
                position: 'relative', 
                animation: isVisible ? `${fadeInRight} 0.8s ease-out 0.2s both` : 'none', 
                mr: { md: 3 }, 
                mb: { xs: 3, md: 0 } 
              }}
            >
              <Box sx={{ position: 'absolute', top: 20, left: 20, right: -20, bottom: -20, bgcolor: 'gold.main', zIndex: 0 }} />
              <Box sx={{ position: 'relative', zIndex: 1, overflow: 'hidden', '&:hover img': { transform: 'scale(1.03)' } }}>
                <Box 
                  component="img" 
                  src={IMAGES.dubai5} 
                  alt="Dubai Property" 
                  sx={{ 
                    width: '100%', 
                    height: { xs: 350, md: 450 }, 
                    objectFit: 'cover', 
                    transition: 'transform 0.6s ease', 
                    display: 'block' 
                  }} 
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// ============ MISSION VISION SECTION ============
const MissionVisionSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const theme = useTheme();

  const cards = [
    { 
      icon: Target, 
      title: 'OUR MISSION', 
      description: 'To set new benchmarks in luxury real estate in Dubai, delivering exceptional properties that enhance lifestyles and exceed expectations.', 
      image: IMAGES.mission 
    },
    { 
      icon: Eye, 
      title: 'OUR VISION', 
      description: 'To be the leading name in luxury real estate in Dubai, renowned for our exquisite designs, unparalleled service, and enduring client relationships.', 
      image: IMAGES.vision 
    },
  ];

  return (
    <Box ref={ref} sx={{ py: { xs: 6, md: 8, lg: 6 }, bgcolor: 'background.subtle', position: 'relative' }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            sx={{
              color: 'gold.main',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              mb: 2,
              animation: isVisible ? `${fadeInUp} 0.6s ease-out` : 'none'
            }}
          >
            Our Purpose
          </Typography>
          
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: { xs: '2rem', md: '3rem' }, 
              fontFamily: '"Playfair Display", Georgia, serif',
              color: 'text.primary',
              fontWeight: 400,
              animation: isVisible ? `${fadeInUp} 0.6s ease-out 0.1s both` : 'none'
            }}
          >
            Pioneering{' '}
            <Box component="span" sx={{ color: 'gold.main', fontStyle: 'italic' }}>
              Excellence
            </Box>
          </Typography>
        </Box>
        
        <Grid container spacing={12} justifyContent="center">
          {cards.map((card, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 5, lg: 4 }} key={index}>
              <Box 
                sx={{ 
                  position: 'relative', 
                  height: { xs: 340, md: 360, lg: 320 }, 
                  borderRadius: 1, 
                  overflow: 'hidden', 
                  cursor: 'pointer', 
                  animation: isVisible ? `${fadeInUp} 0.6s ease-out ${0.1 + index * 0.1}s both` : 'none', 
                  boxShadow: `0 10px 40px ${alpha(theme.palette.navy.main, 0.1)}`,
                  '&:hover .white-content-box': { transform: 'translateY(0)' }, 
                  '&:hover .card-image': { transform: 'scale(1.05)' } 
                }}
              >
                <Box 
                  className="card-image" 
                  component="img" 
                  src={card.image} 
                  alt={card.title} 
                  sx={{ 
                    position: 'absolute', 
                    inset: 0, 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    transition: 'transform 0.6s ease' 
                  }} 
                />
                
                <Box 
                  className="white-content-box" 
                  sx={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    right: 0,
                    height: '100%',
                    bgcolor: 'background.paper',
                    transform: 'translateY(calc(100% - 65px))',
                    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)', 
                    display: 'flex', 
                    flexDirection: 'column' 
                  }}
                >
                  <Box sx={{ 
                    height: 65, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    flexShrink: 0
                  }}>
                    <Typography sx={{
                      color: 'text.primary',
                      fontSize: '0.85rem',
                      fontWeight: 600, 
                      letterSpacing: '2px', 
                      textTransform: 'uppercase', 
                      textAlign: 'center' 
                    }}>
                      {card.title}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    textAlign: 'center', 
                    p: 2 
                  }}>
                    <Typography sx={{
                      color: 'text.secondary',
                      fontSize: '1.2rem',
                      lineHeight: 2.2, 
                      maxWidth: 420, 
                      fontStyle: 'italic' 
                    }}>
                      {card.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// ============ ACHIEVEMENTS SECTION ============
const AchievementsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => { 
      setActiveIndex((prev) => (prev + 1) % ACHIEVEMENTS.length); 
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => { 
    setIsAutoPlaying(false); 
    setActiveIndex((prev) => (prev - 1 + ACHIEVEMENTS.length) % ACHIEVEMENTS.length); 
  };
  
  const handleNext = () => { 
    setIsAutoPlaying(false); 
    setActiveIndex((prev) => (prev + 1) % ACHIEVEMENTS.length); 
  };

  return (
    <Box ref={ref} sx={{ py: { xs: 10, md: 16 }, bgcolor: 'navy.main' }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
            <Award size={20} color={theme.palette.gold.main} />
            <Typography sx={{ color: 'gold.main', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase' }}>
              Recognition
            </Typography>
            <Award size={20} color={theme.palette.gold.main} />
          </Box>
          
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: { xs: '2rem', md: '3rem' }, 
              fontFamily: '"Playfair Display", Georgia, serif',
              color: 'common.white',
              fontWeight: 400,
              animation: isVisible ? `${fadeInUp} 0.6s ease-out` : 'none'
            }}
          >
            Our{' '}
            <Box component="span" sx={{ color: 'gold.main', fontStyle: 'italic' }}>
              Achievements
            </Box>
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ 
              position: 'relative', 
              height: { xs: 350, md: 500 }, 
              borderRadius: 4, 
              overflow: 'hidden',
              border: `1px solid ${alpha(theme.palette.gold.main, 0.2)}`,
              animation: isVisible ? `${fadeInUp} 0.8s ease-out` : 'none'
            }}>
              {ACHIEVEMENTS.map((img, index) => (
                <Box 
                  key={index} 
                  component="img" 
                  src={img} 
                  alt={`Achievement ${index + 1}`} 
                  sx={{ 
                    position: 'absolute', 
                    inset: 0, 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    opacity: activeIndex === index ? 1 : 0, 
                    transform: activeIndex === index ? 'scale(1)' : 'scale(1.05)', 
                    transition: 'all 0.8s ease' 
                  }} 
                />
              ))}
              
              <Box sx={{ position: 'absolute', bottom: 20, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box
                  onClick={handlePrev}
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    border: `1px solid ${alpha(theme.palette.gold.main, 0.31)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    background: alpha(theme.palette.navy.main, 0.8),
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': { background: alpha(theme.palette.gold.main, 0.19), borderColor: 'gold.main' }
                  }}
                >
                  <Box sx={{ color: 'gold.main' }}>❮</Box>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {ACHIEVEMENTS.map((_, index) => (
                    <Box 
                      key={index} 
                      onClick={() => { 
                        setIsAutoPlaying(false); 
                        setActiveIndex(index); 
                      }} 
                      sx={{ 
                        width: activeIndex === index ? 30 : 10, 
                        height: 10, 
                        borderRadius: 5,
                        bgcolor: activeIndex === index ? 'gold.main' : alpha(theme.palette.common.white, 0.3),
                        cursor: 'pointer',
                        transition: 'all 0.3s ease' 
                      }} 
                    />
                  ))}
                </Box>
                
                <Box
                  onClick={handleNext}
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    border: `1px solid ${alpha(theme.palette.gold.main, 0.31)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    background: alpha(theme.palette.navy.main, 0.8),
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': { background: alpha(theme.palette.gold.main, 0.19), borderColor: 'gold.main' }
                  }}
                >
                  <Box sx={{ color: 'gold.main' }}>❯</Box>
                </Box>
              </Box>
              
              <Box sx={{ position: 'absolute', top: 20, right: 20, display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, borderRadius: 50, bgcolor: 'gold.main', animation: `${pulse} 2s ease-in-out infinite` }}>
                <Award size={14} color={theme.palette.navy.main} />
                <Typography sx={{ color: 'navy.main', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '1px' }}>
                  AWARD WINNING
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, md: 5 }}>
            <Grid container spacing={2}>
              {ACHIEVEMENTS.slice(0, 4).map((img, index) => (
                <Grid size={{ xs: 6 }} key={index}>
                  <Box 
                    onClick={() => { 
                      setIsAutoPlaying(false); 
                      setActiveIndex(index); 
                    }} 
                    sx={{ 
                      position: 'relative', 
                      height: { xs: 140, md: 240 }, 
                      borderRadius: 3, 
                      overflow: 'hidden', 
                      cursor: 'pointer', 
                      border: activeIndex === index ? `3px solid ${theme.palette.gold.main}` : `1px solid ${alpha(theme.palette.gold.main, 0.2)}`,
                      transition: 'all 0.4s ease',
                      animation: isVisible ? `${fadeInUp} 0.6s ease-out ${0.1 * index}s both` : 'none',
                      '&:hover': { transform: 'scale(1.03)', borderColor: alpha(theme.palette.gold.main, 0.38) },
                      '&:hover img': { transform: 'scale(1.1)' } 
                    }}
                  >
                    <Box 
                      component="img" 
                      src={img} 
                      alt={`Thumbnail ${index + 1}`} 
                      sx={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        transition: 'transform 0.5s ease' 
                      }} 
                    />
                    <Box sx={{ 
                      position: 'absolute', 
                      inset: 0, 
                      background: activeIndex === index ? 'transparent' : alpha(theme.palette.navy.main, 0.3),
                      transition: 'all 0.3s ease'
                    }} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// ============ MAIN COMPONENT ============
const AboutUsPage = () => {
  return (
    <Box sx={{ bgcolor: 'navy.main', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Simple Header - NO BIG HERO */}
      <SimpleAboutHeader />
      
      {/* Rest of sections */}
      <AboutSection />
      <MissionVisionSection />
      <AchievementsSection />
    </Box>
  );
};

export default AboutUsPage;