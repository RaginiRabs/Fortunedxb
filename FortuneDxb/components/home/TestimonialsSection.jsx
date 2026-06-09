'use client';
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  IconButton,
  useMediaQuery,
  useTheme,
  Skeleton,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Quote,
  Star,
  MapPin,
  BadgeCheck,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useTestimonials } from '@/hooks/testimonial/useTestimonialsHook';

// Fallback data in case API fails
const fallbackTestimonials = [
  {
    testimonial_id: 1,
    client_name: 'James Richardson',
    client_location: 'United Kingdom',
    review_text: 'Investing in Dubai through Fortune DXB was seamless. Their team guided me through every step of purchasing my off-plan apartment in Downtown. The process was transparent and professional.',
    rating: 5,
    client_image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
  },
  {
    testimonial_id: 2,
    client_name: 'Chen Wei',
    client_location: 'China',
    review_text: 'The ROI calculator and market insights helped me make an informed decision. My Palm Jumeirah investment has exceeded all expectations. Highly recommend their services.',
    rating: 5,
    client_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
  },
  {
    testimonial_id: 3,
    client_name: 'Sarah Mitchell',
    client_location: 'USA',
    review_text: 'From property selection to Golden Visa, Fortune DXB made my Dubai investment journey absolutely effortless. Their expertise in the market is unmatched.',
    rating: 5,
    client_image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  },
];

// Country to flag emoji mapping
const countryFlags = {
  'United Kingdom': '🇬🇧',
  'UK': '🇬🇧',
  'China': '🇨🇳',
  'Russia': '🇷🇺',
  'USA': '🇺🇸',
  'United States': '🇺🇸',
  'India': '🇮🇳',
  'Dubai, UAE': '🇦🇪',
  'UAE': '🇦🇪',
  'Saudi Arabia': '🇸🇦',
  'Philippines': '🇵🇭',
  'Australia': '🇦🇺',
  'Germany': '🇩🇪',
  'France': '🇫🇷',
  'Canada': '🇨🇦',
  'Pakistan': '🇵🇰',
};

const getFlag = (location) => {
  if (!location) return '🌍';
  for (const [country, flag] of Object.entries(countryFlags)) {
    if (location.toLowerCase().includes(country.toLowerCase())) {
      return flag;
    }
  }
  return '🌍';
};

const TestimonialsSection = () => {
  const [featured, setFeatured] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Fetch testimonials from API
  const { testimonials: apiTestimonials, loading, error, fetchTestimonials } = useTestimonials();

  // Use API data or fallback
  const testimonials = apiTestimonials?.length > 0 ? apiTestimonials : fallbackTestimonials;

  // Fetch on mount
  useEffect(() => {
    fetchTestimonials({ featured: true, limit: 6 });
  }, [fetchTestimonials]);

  // Auto slide every 10 seconds
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;

    const interval = setInterval(() => {
      setFeatured((prev) => (prev + 1) % testimonials.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setFeatured((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 30000);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setFeatured((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 30000);
  };

  // Handle image path
  const getImagePath = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  };

  // Loading Skeleton
  const LoadingSkeleton = () => (
    <Box
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        minHeight: { xs: 380, md: 430 },
        background: `linear-gradient(145deg, ${alpha(theme.palette.common.white, 0.08)} 0%, ${alpha(theme.palette.common.white, 0.03)} 100%)`,
        border: `1px solid ${alpha(theme.palette.gold.main, 0.25)}`,
        p: { xs: 2.5, md: 4 },
      }}
    >
      <Skeleton variant="rounded" width={45} height={45} sx={{ bgcolor: alpha(theme.palette.common.white, 0.1), mb: 2 }} />
      <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} variant="circular" width={16} height={16} sx={{ bgcolor: alpha(theme.palette.common.white, 0.1) }} />
        ))}
      </Box>
      <Skeleton variant="text" sx={{ bgcolor: alpha(theme.palette.common.white, 0.1), fontSize: '1.1rem', mb: 1 }} />
      <Skeleton variant="text" sx={{ bgcolor: alpha(theme.palette.common.white, 0.1), fontSize: '1.1rem', mb: 1 }} />
      <Skeleton variant="text" sx={{ bgcolor: alpha(theme.palette.common.white, 0.1), fontSize: '1.1rem', width: '80%' }} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 'auto', pt: 2 }}>
        <Skeleton variant="circular" width={55} height={55} sx={{ bgcolor: alpha(theme.palette.common.white, 0.1) }} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width={120} sx={{ bgcolor: alpha(theme.palette.common.white, 0.1) }} />
          <Skeleton variant="text" width={80} sx={{ bgcolor: alpha(theme.palette.common.white, 0.1) }} />
        </Box>
      </Box>
    </Box>
  );

  // Featured Card Component
  const FeaturedCard = () => {
    if (loading) return <LoadingSkeleton />;
    if (testimonials.length === 0) return null;

    const current = testimonials[featured];
    const flag = getFlag(current.client_location);

    return (
      <Box
        sx={{
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden',
          minHeight: { xs: 380, md: 430 },
          background: `linear-gradient(145deg, ${alpha(theme.palette.common.white, 0.08)} 0%, ${alpha(theme.palette.common.white, 0.03)} 100%)`,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha(theme.palette.gold.main, 0.25)}`,
          p: { xs: 2.5, md: 4 },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Quote Icon */}
        <Box
          sx={{
            width: 45,
            height: 45,
            borderRadius: 2.5,
            background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.dark} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            boxShadow: `0 8px 25px ${alpha(theme.palette.gold.main, 0.3)}`,
          }}
        >
          <Quote size={22} color={theme.palette.navy.main} />
        </Box>

        {/* Rating */}
        <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < (current.rating || 5) ? theme.palette.gold.main : 'transparent'}
              color={theme.palette.gold.main}
            />
          ))}
        </Box>

        {/* Quote Text */}
        <Typography
          sx={{
            color: 'common.white',
            fontSize: { xs: '0.95rem', md: '1.1rem' },
            lineHeight: 1.8,
            fontStyle: 'italic',
            fontFamily: '"Quicksand", sans-serif',
            flex: 1,
            mb: 2,
          }}
        >
          "{current.review_text}"
        </Typography>

        {/* Author Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            pt: 2,
            borderTop: `1px solid ${alpha(theme.palette.gold.main, 0.2)}`,
          }}
        >
          <Avatar
            src={getImagePath(current.client_image)}
            sx={{
              width: { xs: 50, md: 55 },
              height: { xs: 50, md: 55 },
              border: `3px solid ${theme.palette.gold.main}`,
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              bgcolor: 'gold.main',
              color: 'navy.main',
              fontWeight: 700,
              fontSize: '1.2rem',
            }}
          >
            {current.client_name?.charAt(0)}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.25 }}>
              <Typography
                sx={{
                  color: 'common.white',
                  fontWeight: 700,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontFamily: '"Quicksand", sans-serif',
                }}
              >
                {current.client_name}
              </Typography>
              <Typography sx={{ fontSize: '1rem' }}>{flag}</Typography>
              <BadgeCheck size={14} color={theme.palette.gold.main} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
              <MapPin size={11} color={theme.palette.gold.main} />
              <Typography
                sx={{
                  color: alpha(theme.palette.common.white, 0.5),
                  fontSize: '0.65rem',
                  fontFamily: '"Quicksand", sans-serif',
                  fontStyle: 'italic',
                }}
              >
                {current.client_location || 'Dubai, UAE'}
              </Typography>
            </Box>
            {current.client_designation && (
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                  px: 1,
                  py: 0.3,
                  borderRadius: '100px',
                  bgcolor: alpha(theme.palette.gold.main, 0.15),
                  border: `1px solid ${alpha(theme.palette.gold.main, 0.3)}`,
                }}
              >
                <TrendingUp size={10} color={theme.palette.gold.main} />
                <Typography
                  sx={{
                    fontSize: '0.6rem',
                    fontWeight: 600,
                    color: 'gold.main',
                    fontFamily: '"Quicksand", sans-serif',
                    fontStyle: 'italic',
                  }}
                >
                  {current.client_designation}
                  {current.project_name && ` • ${current.project_name}`}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Navigation Buttons */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 16, md: 24 },
            right: { xs: 16, md: 24 },
            display: 'flex',
            gap: 1,
          }}
        >
          <IconButton
            onClick={handlePrev}
            sx={{
              width: 36,
              height: 36,
              bgcolor: alpha(theme.palette.common.white, 0.1),
              border: `1px solid ${alpha(theme.palette.gold.main, 0.3)}`,
              color: 'common.white',
              borderRadius: 1,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'gold.main',
                color: 'navy.main',
                borderColor: 'gold.main',
              },
            }}
          >
            <ChevronLeft size={18} />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              width: 36,
              height: 36,
              bgcolor: alpha(theme.palette.common.white, 0.1),
              border: `1px solid ${alpha(theme.palette.gold.main, 0.3)}`,
              color: 'common.white',
              borderRadius: 1,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'gold.main',
                color: 'navy.main',
                borderColor: 'gold.main',
              },
            }}
          >
            <ChevronRight size={18} />
          </IconButton>
        </Box>

        {/* Progress Dots */}
        <Box
          sx={{
            position: 'absolute',
            alignSelf: 'center',
            bottom: { xs: 6, md: 10 },
            display: 'flex',
            gap: 0.75,
          }}
        >
          {testimonials.map((_, i) => (
            <Box
              key={i}
              onClick={() => {
                setIsAutoPlaying(false);
                setFeatured(i);
                setTimeout(() => setIsAutoPlaying(true), 30000);
              }}
              sx={{
                width: featured === i ? 20 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor: featured === i ? 'gold.main' : alpha(theme.palette.common.white, 0.3),
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: featured === i ? 'gold.main' : alpha(theme.palette.common.white, 0.5),
                },
              }}
            />
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        py: { xs: 4, md: 5 },
        background: `linear-gradient(180deg, ${theme.palette.navy.main} 0%, ${theme.palette.navy.light} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `
            linear-gradient(90deg, ${theme.palette.gold.main} 1px, transparent 1px),
            linear-gradient(0deg, ${theme.palette.gold.main} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Gold Glow Effects */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.gold.main, 0.15)} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

     <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.5,
              mb: 1.5,
            }}
          >
            <Box
              sx={{
                width: 50,
                height: 1,
                background: `linear-gradient(90deg, transparent 0%, ${theme.palette.gold.main} 100%)`,
              }}
            />
            <Typography
              sx={{
                color: 'gold.main',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: 3,
                textTransform: 'uppercase',
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
              }}
            >
              Client Stories
            </Typography>
            <Box
              sx={{
                width: 50,
                height: 1,
                background: `linear-gradient(90deg, ${theme.palette.gold.main} 0%, transparent 100%)`,
              }}
            />
          </Box>

          <Typography
            sx={{
              color: 'common.white',
              fontFamily: '"Quicksand", sans-serif',
              fontWeight: 600,
              fontSize: { xs: '1.5rem', md: '1.8rem' },
              mb: 0.5,
            }}
          >
            Trusted by{' '}
            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.pale} 50%, ${theme.palette.gold.main} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Global Investors
            </Box>
          </Typography>

          <Typography
            sx={{
              color: alpha(theme.palette.common.white, 0.5),
              fontSize: '0.85rem',
              fontFamily: '"Quicksand", sans-serif',
              fontStyle: 'italic',
            }}
          >
            Real success stories from investors worldwide
          </Typography>
        </Box>

        {/* Mobile/Tablet: Only Slider Card */}
        {isTablet ? (
          <FeaturedCard />
        ) : (
          /* Desktop: Magazine Layout */
          <Box
            sx={{
              display: 'flex',
              gap: 3,
            }}
          >
            {/* Left - Featured Card */}
            <Box sx={{ flex: '0 0 58%' }}>
              <FeaturedCard />
            </Box>

            {/* Right - Testimonial List */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              {loading ? (
                // Loading skeletons for list
                [...Array(4)].map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.common.white, 0.03),
                      border: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Skeleton variant="circular" width={46} height={46} sx={{ bgcolor: alpha(theme.palette.common.white, 0.1) }} />
                      <Box sx={{ flex: 1 }}>
                        <Skeleton variant="text" width={100} sx={{ bgcolor: alpha(theme.palette.common.white, 0.1) }} />
                        <Skeleton variant="text" width={60} sx={{ bgcolor: alpha(theme.palette.common.white, 0.1) }} />
                      </Box>
                    </Box>
                  </Box>
                ))
              ) : (
                testimonials.map((t, i) => (
                  <Box
                    key={t.testimonial_id || i}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setFeatured(i);
                      setTimeout(() => setIsAutoPlaying(true), 30000);
                    }}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: featured === i
                        ? alpha(theme.palette.gold.main, 0.15)
                        : alpha(theme.palette.common.white, 0.03),
                      border: '1px solid',
                      borderColor: featured === i
                        ? alpha(theme.palette.gold.main, 0.4)
                        : alpha(theme.palette.common.white, 0.08),
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: alpha(theme.palette.gold.main, 0.4),
                        bgcolor: alpha(theme.palette.gold.main, 0.1),
                        transform: 'translateX(8px)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar
                        src={getImagePath(t.client_image)}
                        sx={{
                          width: 46,
                          height: 46,
                          border: featured === i
                            ? `2px solid ${theme.palette.gold.main}`
                            : `2px solid ${alpha(theme.palette.common.white, 0.2)}`,
                          transition: 'all 0.3s ease',
                          bgcolor: 'gold.main',
                          color: 'navy.main',
                          fontWeight: 600,
                        }}
                      >
                        {t.client_name?.charAt(0)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.25 }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: '0.8rem',
                              color: featured === i ? 'gold.main' : 'common.white',
                              fontFamily: '"Quicksand", sans-serif',
                              fontStyle: 'italic',
                              transition: 'color 0.3s ease',
                            }}
                          >
                            {t.client_name}
                          </Typography>
                          <Typography sx={{ fontSize: '0.9rem' }}>{getFlag(t.client_location)}</Typography>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: '0.6rem',
                            color: alpha(theme.palette.common.white, 0.4),
                            fontFamily: '"Quicksand", sans-serif',
                            fontStyle: 'italic',
                          }}
                        >
                          {t.client_designation || t.client_location}
                          {t.project_name && ` • ${t.project_name}`}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 0.25 }}>
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            size={11}
                            fill={j < (t.rating || 5) ? theme.palette.gold.main : 'transparent'}
                            color={theme.palette.gold.main}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                ))
              )}

              {/* Stats Row */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  mt: 'auto',
                  pt: 1,
                }}
              >
                {[
                  { value: '500+', label: 'Investors' },
                  { value: '45+', label: 'Countries' },
                  { value: '4.9', label: 'Rating' },
                ].map((stat, i) => (
                  <Box
                    key={i}
                    sx={{
                      flex: 1,
                      textAlign: 'center',
                      py: 1.5,
                      borderRadius: 1,
                      bgcolor: alpha(theme.palette.common.white, 0.03),
                      border: `1px solid ${alpha(theme.palette.gold.main, 0.15)}`,
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'gold.main',
                        fontWeight: 700,
                        fontSize: '1rem',
                        fontFamily: '"Quicksand", sans-serif',
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      sx={{
                        color: alpha(theme.palette.common.white, 0.4),
                        fontSize: '0.55rem',
                        mt: 0.25,
                        fontFamily: '"Quicksand", sans-serif',
                        fontStyle: 'italic',
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}

        {/* Mobile Stats Row */}
        {isTablet && (
          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              mt: 3,
            }}
          >
            {[
              { value: '500+', label: 'Investors' },
              { value: '45+', label: 'Countries' },
              { value: '4.9', label: 'Rating' },
            ].map((stat, i) => (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  textAlign: 'center',
                  py: 1.5,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.common.white, 0.03),
                  border: `1px solid ${alpha(theme.palette.gold.main, 0.15)}`,
                }}
              >
                <Typography
                  sx={{
                    color: 'gold.main',
                    fontWeight: 700,
                    fontSize: '1rem',
                    fontFamily: '"Quicksand", sans-serif',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    color: alpha(theme.palette.common.white, 0.4),
                    fontSize: '0.55rem',
                    mt: 0.25,
                    fontFamily: '"Quicksand", sans-serif',
                    fontStyle: 'italic',
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default TestimonialsSection;