import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import {
  Gift,
  MapPin,
  ArrowRight,
  Percent,
  Zap,
  Sparkles,
  Crown,
  Timer,
  ChevronLeft,
  ChevronRight,
  Flame,
  BadgeCheck,
  Scissors,
} from 'lucide-react';

// Countdown Timer Component
const CountdownTimer = ({ validUntil }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(validUntil) - new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [validUntil]);

  return (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      {[
        { value: timeLeft.days, label: 'D' },
        { value: timeLeft.hours, label: 'H' },
        { value: timeLeft.minutes, label: 'M' },
        { value: timeLeft.seconds, label: 'S' },
      ].map((item, index) => (
        <Box
          key={index}
          sx={{
            bgcolor: 'rgba(220, 38, 38, 0.1)',
            borderRadius: 1,
            px: 0.75,
            py: 0.25,
            textAlign: 'center',
            minWidth: 26,
          }}
        >
          <Typography
            sx={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: '#DC2626',
              lineHeight: 1.2,
            }}
          >
            {String(item.value).padStart(2, '0')}
          </Typography>
          <Typography sx={{ fontSize: '0.45rem', color: '#94A3B8', textTransform: 'uppercase' }}>
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

// Offer Type Config
const getOfferConfig = (type) => {
  switch (type) {
    case 'early-bird':
      return { icon: Zap, label: 'EARLY BIRD', color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.1)' };
    case 'limited':
      return { icon: Flame, label: 'LIMITED TIME', color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.1)' };
    case 'exclusive':
      return { icon: Crown, label: 'EXCLUSIVE', color: '#8B5CF6', bgColor: 'rgba(139, 92, 246, 0.1)' };
    case 'discount':
      return { icon: Percent, label: 'DISCOUNT', color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.1)' };
    default:
      return { icon: Gift, label: 'SPECIAL', color: '#C6A962', bgColor: 'rgba(198, 169, 98, 0.1)' };
  }
};

// Perforated Edge
const PerforatedEdge = () => (
  <Box
    sx={{
      position: 'absolute',
      right: 90,
      top: 0,
      bottom: 0,
      width: 20,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      py: 1,
      zIndex: 5,
    }}
  >
    <Box
      sx={{
        width: 20,
        height: 10,
        bgcolor: '#F0F4F8',
        borderRadius: '0 0 20px 20px',
        position: 'absolute',
        top: -1,
      }}
    />
    <Box
      sx={{
        flex: 1,
        width: 2,
        mt: 2,
        mb: 2,
        backgroundImage: 'repeating-linear-gradient(to bottom, #CBD5E1 0px, #CBD5E1 6px, transparent 6px, transparent 12px)',
      }}
    />
    <Box
      sx={{
        width: 20,
        height: 10,
        bgcolor: '#F0F4F8',
        borderRadius: '20px 20px 0 0',
        position: 'absolute',
        bottom: -1,
      }}
    />
  </Box>
);

// Ticket Card Component
const TicketCard = ({ project, isActive, handleInquiry, config }) => {
  const Icon = config.icon;

  return (
    <Box
      sx={{
        display: 'flex',
        background: 'linear-gradient(145deg, #FFFFFF 0%, #FAFAFA 100%)',
        borderRadius: 4,
        overflow: 'hidden',
        border: isActive ? '2px solid rgba(198, 169, 98, 0.4)' : '1px solid #E2E8F0',
        boxShadow: isActive
          ? '0 25px 50px rgba(30, 58, 95, 0.15), 0 0 0 1px rgba(198, 169, 98, 0.1)'
          : '0 4px 12px rgba(0,0,0,0.05)',
        position: 'relative',
        height: '100%',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          flex: 1,
          p: 2.5,
          pr: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Image */}
        <Box
          sx={{
            position: 'relative',
            height: 120,
            borderRadius: 2.5,
            overflow: 'hidden',
            mb: 1.5,
          }}
        >
          <Box
            component="img"
            src={project.image}
            alt={project.name}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              bgcolor: 'rgba(255,255,255,0.95)',
              borderRadius: '100px',
              px: 1,
              py: 0.3,
              backdropFilter: 'blur(4px)',
            }}
          >
            <BadgeCheck size={10} color="#C6A962" />
            <Typography sx={{ color: '#0B1A2A', fontSize: '0.6rem', fontWeight: 600 }}>
              {project.developer}
            </Typography>
          </Box>
        </Box>

        {/* Project Info */}
        <Typography
          sx={{
            color: '#0B1A2A',
            fontWeight: 700,
            fontSize: '1rem',
            fontFamily: '"Playfair Display", serif',
            mb: 0.25,
            lineHeight: 1.2,
          }}
        >
          {project.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
          <MapPin size={10} color="#C6A962" />
          <Typography sx={{ color: '#64748B', fontSize: '0.65rem' }}>
            {project.location}
          </Typography>
        </Box>

        {/* Offer Details */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
          <Sparkles size={10} color="#C6A962" />
          <Typography sx={{ color: '#A68B4B', fontWeight: 600, fontSize: '0.65rem' }}>
            {project.offer?.title}
          </Typography>
        </Box>

        <Typography
          sx={{
            color: '#64748B',
            fontSize: '0.6rem',
            lineHeight: 1.4,
            mb: 1.5,
            flex: 1,
          }}
        >
          {project.offer?.description}
        </Typography>

        {/* Timer */}
        <Box>
          <Typography
            sx={{
              color: '#94A3B8',
              fontSize: '0.5rem',
              mb: 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            <Timer size={9} /> Expires in
          </Typography>
          <CountdownTimer validUntil={project.offer?.validUntil} />
        </Box>
      </Box>

      <PerforatedEdge />

      {/* Right Section - Stub */}
      <Box
        sx={{
          width: 90,
          background: `linear-gradient(180deg, ${config.bgColor} 0%, rgba(255,255,255,0.5) 100%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1.5,
          py: 2,
          borderLeft: 'none',
        }}
      >
        {/* Offer Type Badge */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              bgcolor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: `2px solid ${config.color}`,
            }}
          >
            <Icon size={16} color={config.color} />
          </Box>
          <Typography
            sx={{
              color: config.color,
              fontWeight: 800,
              fontSize: '0.5rem',
              letterSpacing: 0.5,
              textAlign: 'center',
            }}
          >
            {config.label}
          </Typography>
        </Box>

        {/* Price */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ color: '#94A3B8', fontSize: '0.45rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            From
          </Typography>
          <Typography sx={{ color: '#0B1A2A', fontWeight: 800, fontSize: '0.85rem', lineHeight: 1.2 }}>
            {project.price}
          </Typography>
        </Box>

        {/* Scissors */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3, color: '#CBD5E1' }}>
          <Scissors size={9} />
          <Typography sx={{ fontSize: '0.45rem' }}>CUT HERE</Typography>
        </Box>

        {/* CTA Button */}
        <Button
          variant="contained"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleInquiry(project);
          }}
          sx={{
            background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
            color: 'white',
            width: '100%',
            py: 0.6,
            borderRadius: 2,
            fontWeight: 700,
            fontSize: '0.55rem',
            textTransform: 'none',
            boxShadow: '0 2px 8px rgba(198, 169, 98, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #D4BC7D 0%, #C6A962 100%)',
            },
          }}
          endIcon={<ArrowRight size={10} />}
        >
          Claim
        </Button>
      </Box>
    </Box>
  );
};

const ExclusiveOffers = ({ projectsWithOffers, handleInquiry }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const offersProjects = projectsWithOffers.filter((project) => project.offer);

  if (offersProjects.length === 0) return null;

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % offersProjects.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + offersProjects.length) % offersProjects.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  // Get card position - 5 cards visible (2 left, 1 center, 2 right)
  const getCardStyle = (index) => {
    const diff = index - activeIndex;
    const totalCards = offersProjects.length;

    // Normalize position for circular array
    let position = diff;
    if (diff > totalCards / 2) position = diff - totalCards;
    if (diff < -totalCards / 2) position = diff + totalCards;

    // Position 0 = center (active)
    // Position -1 = first left
    // Position -2 = second left (far left)
    // Position 1 = first right
    // Position 2 = second right (far right)

    switch (position) {
      case 0: // Center - Active
        return {
          transform: 'translateX(0) scale(1)',
          zIndex: 50,
          opacity: 1,
          filter: 'blur(0px)',
          pointerEvents: 'auto',
        };
      case 1: // First Right
        return {
          transform: 'translateX(55%) scale(0.85)',
          zIndex: 40,
          opacity: 0.8,
          filter: 'blur(0.5px)',
          pointerEvents: 'auto',
        };
      case -1: // First Left
        return {
          transform: 'translateX(-55%) scale(0.85)',
          zIndex: 40,
          opacity: 0.8,
          filter: 'blur(0.5px)',
          pointerEvents: 'auto',
        };
      case 2: // Second Right (Far)
        return {
          transform: 'translateX(95%) scale(0.7)',
          zIndex: 30,
          opacity: 0.5,
          filter: 'blur(1px)',
          pointerEvents: 'auto',
        };
      case -2: // Second Left (Far)
        return {
          transform: 'translateX(-95%) scale(0.7)',
          zIndex: 30,
          opacity: 0.5,
          filter: 'blur(1px)',
          pointerEvents: 'auto',
        };
      default: // Hidden cards
        return {
          transform: 'translateX(0) scale(0.5)',
          zIndex: 10,
          opacity: 0,
          filter: 'blur(4px)',
          pointerEvents: 'none',
        };
    }
  };

  return (
    <Box
      sx={{
        pt: { xs: 3, md: 4 },
        pb: { xs: 4, md: 5 },
        background: 'linear-gradient(180deg, #FAFAFA 0%, #F0F4F8 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
          background: `
            radial-gradient(circle at 15% 25%, rgba(198, 170, 98, 0.5) 0%, transparent 35%),
            radial-gradient(circle at 85% 75%, rgba(11, 26, 42, 0.5) 0%, transparent 35%)
          `,
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              color: '#0B1A2A',
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              fontSize: { xs: '1.5rem', md: '1.8rem' },
              mb: 0.5,
            }}
          >
            Exclusive{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Offers
            </Box>
          </Typography>

          <Typography sx={{ color: '#64748B', fontSize: '0.85rem' }}>
            Grab these deals before they expire
          </Typography>
        </Box>

        {/* Carousel Container - Full Width for 5 cards */}
        <Box
          sx={{
            position: 'relative',
            height: { xs: 360, md: 400 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 2, md: 8 },
          }}
        >
          {/* Navigation Left */}
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              left: { xs: 0, md: 20 },
              zIndex: 60,
              width: 40,
              height: 40,
              bgcolor: 'white',
              border: '1px solid #E2E8F0',
              color: '#0B1A2A',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease',
              '&:hover': { bgcolor: '#0B1A2A', color: 'white' },
            }}
          >
            <ChevronLeft size={20} />
          </IconButton>

          {/* Cards Container - Wider for 5 cards */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: { xs: 340, md: 420 },
              height: '100%',
            }}
          >
            {offersProjects.map((project, index) => {
              const cardStyle = getCardStyle(index);
              const config = getOfferConfig(project.offer?.type);

              return (
                <Box
                  key={project.id}
                  onClick={() => {
                    if (index !== activeIndex && !isAnimating) {
                      setIsAnimating(true);
                      setActiveIndex(index);
                      setTimeout(() => setIsAnimating(false), 400);
                    }
                  }}
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: { xs: 300, md: 380 },
                    height: { xs: 320, md: 360 },
                    marginLeft: { xs: '-150px', md: '-190px' },
                    marginTop: { xs: '-160px', md: '-180px' },
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: index === activeIndex ? 'default' : 'pointer',
                    ...cardStyle,
                  }}
                >
                  <TicketCard
                    project={project}
                    isActive={index === activeIndex}
                    handleInquiry={handleInquiry}
                    config={config}
                  />
                </Box>
              );
            })}
          </Box>

          {/* Navigation Right */}
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: { xs: 0, md: 20 },
              zIndex: 60,
              width: 40,
              height: 40,
              bgcolor: 'white',
              border: '1px solid #E2E8F0',
              color: '#0B1A2A',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease',
              '&:hover': { bgcolor: '#0B1A2A', color: 'white' },
            }}
          >
            <ChevronRight size={20} />
          </IconButton>
        </Box>

        {/* Dots */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.75,
            mt: 2,
          }}
        >
          {offersProjects.map((_, index) => (
            <Box
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setActiveIndex(index);
                  setTimeout(() => setIsAnimating(false), 400);
                }
              }}
              sx={{
                width: index === activeIndex ? 24 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor: index === activeIndex ? '#C6A962' : '#CBD5E1',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': { bgcolor: index === activeIndex ? '#C6A962' : '#94A3B8' },
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ExclusiveOffers;