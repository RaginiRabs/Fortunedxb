'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import fortuneLogo from '../../public/asset/logo.png';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Button,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Clock,
  Shield,
  Award,
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const theme = useTheme();
  const gold = theme.palette.gold.main;
  const white = theme.palette.common.white;
  // Footer is an always-dark surface (same in light & dark mode)
  const footerBg = theme.palette.navy.dark;
  const footerBgDeep = '#070710';

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setEmail('');
  };

  const socialIcons = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const trustBadges = [
    { icon: Award, text: 'Award Winning' },
    { icon: Clock, text: '24/7 Support' },
  ];

  return (
    <Box component="footer">

      {/* Newsletter Section */}
      <Box
        sx={{
          py: { xs: 3, md: 4 },
          bgcolor: footerBg,
          borderBottom: `1px solid ${alpha(gold, 0.15)}`,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              justifyContent: 'space-between',
              gap: { xs: 2.5, md: 3 },
            }}
          >
            {/* Left - Text Content */}
            <Box sx={{ flex: { md: '0 0 auto' } }}>
              <Typography
                sx={{
                  color: white,
                  fontFamily: '"Quicksand", sans-serif',
                  fontWeight: 700,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  mb: 0.5,
                }}
              >
                Stay Updated on Dubai's Best Projects
              </Typography>
              <Typography
                sx={{
                  color: alpha(white, 0.5),
                  fontFamily: '"Quicksand", sans-serif',
                  fontSize: { xs: '0.8rem', md: '0.85rem' },
                }}
              >
                Get exclusive early access to new launches and market insights
              </Typography>
            </Box>

            {/* Right - Form */}
            <Box
              component="form"
              onSubmit={handleNewsletterSubmit}
              sx={{
                display: 'flex',
                gap: 1.5,
                width: { xs: '100%', md: 'auto' },
                minWidth: { md: 400 },
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 2,
                  py: 1.25,
                  bgcolor: alpha(white, 0.05),
                  border: `1px solid ${alpha(white, 0.08)}`,
                  borderRadius: 1,
                  transition: 'all 0.3s ease',
                  '&:focus-within': {
                    borderColor: gold,
                    bgcolor: alpha(white, 0.08),
                  },
                }}
              >
                <Mail size={18} color={alpha(white, 0.4)} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: white,
                    fontSize: '0.9rem',
                    fontFamily: '"Quicksand", sans-serif',
                  }}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.light} 100%)`,
                  color: footerBg,
                  fontFamily: '"Quicksand", sans-serif',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  px: 3,
                  py: 1.25,
                  borderRadius: 1,
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  boxShadow: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.gold.light} 0%, ${theme.palette.gold.main} 100%)`,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 8px 20px ${alpha(gold, 0.3)}`,
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Footer */}
      <Box
        sx={{
          py: { xs: 4, md: 5 },
          bgcolor: footerBg,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.5fr 1fr 1fr' },
              gap: { xs: 4, md: 6 },
            }}
          >
            {/* Logo & About */}
            <Box>
              {/* Logo */}
              <Box
                sx={{
                  mb: 2,
                  position: 'relative',
                  width: { xs: 140, md: 180 },
                  height: { xs: 45, md: 55 },
                }}
              >
                <Image
                  src={fortuneLogo}
                  alt="Fortune DXB"
                  fill
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'left center',
                  }}
                  priority
                />
              </Box>

              <Typography
                sx={{
                  color: alpha(white, 0.5),
                  fontFamily: '"Quicksand", sans-serif',
                  fontSize: '0.9rem',
                  lineHeight: 1.8,
                  mb: 2.5,
                  maxWidth: 350,
                }}
              >
                Dubai's premier off-plan property portal, connecting global investors
                with exclusive real estate opportunities. Your trusted partner since 2015.
              </Typography>

              {/* Trust Badges */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5 }}>
                {trustBadges.map((badge, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <badge.icon size={16} color={gold} />
                    <Typography
                      sx={{
                        color: alpha(white, 0.6),
                        fontFamily: '"Quicksand", sans-serif',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                      }}
                    >
                      {badge.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Contact Info */}
            <Box>
              <Typography
                sx={{
                  color: white,
                  fontFamily: '"Quicksand", sans-serif',
                  fontWeight: 700,
                  fontSize: '1rem',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  '&::after': {
                    content: '""',
                    flex: 1,
                    height: 1,
                    bgcolor: alpha(gold, 0.2),
                    ml: 2,
                  },
                }}
              >
                Contact Us
              </Typography>

              {/* Phone */}
              <Box
                component="a"
                href="tel:+971582335969"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: 1.5,
                  textDecoration: 'none',
                  p: 1,
                  mx: -1,
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: alpha(gold, 0.05),
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: alpha(gold, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Phone size={18} color={gold} />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: alpha(white, 0.4),
                      fontFamily: '"Quicksand", sans-serif',
                      fontSize: '0.7rem',
                      mb: 0.25,
                    }}
                  >
                    Call Us
                  </Typography>
                  <Typography
                    sx={{
                      color: white,
                      fontFamily: '"Quicksand", sans-serif',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                    }}
                  >
                    +971 58 233 5969
                  </Typography>
                </Box>
              </Box>

              {/* Email */}
              <Box
                component="a"
                href="mailto:info@fortunedxb.com"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: 1.5,
                  textDecoration: 'none',
                  p: 1,
                  mx: -1,
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: alpha(gold, 0.05),
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: alpha(gold, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Mail size={18} color={gold} />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: alpha(white, 0.4),
                      fontFamily: '"Quicksand", sans-serif',
                      fontSize: '0.7rem',
                      mb: 0.25,
                    }}
                  >
                    Email Us
                  </Typography>
                  <Typography
                    sx={{
                      color: white,
                      fontFamily: '"Quicksand", sans-serif',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                    }}
                  >
                    info@fortunedxb.com
                  </Typography>
                </Box>
              </Box>

              {/* Location */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 1,
                  mx: -1,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: alpha(gold, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MapPin size={18} color={gold} />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: alpha(white, 0.4),
                      fontFamily: '"Quicksand", sans-serif',
                      fontSize: '0.7rem',
                      mb: 0.25,
                    }}
                  >
                    Visit Us
                  </Typography>
                  <Typography
                    sx={{
                      color: white,
                      fontFamily: '"Quicksand", sans-serif',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                    }}
                  >
                    Business Bay, Dubai
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Connect & Social */}
            <Box>
              <Typography
                sx={{
                  color: white,
                  fontFamily: '"Quicksand", sans-serif',
                  fontWeight: 700,
                  fontSize: '1rem',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  '&::after': {
                    content: '""',
                    flex: 1,
                    height: 1,
                    bgcolor: alpha(gold, 0.2),
                    ml: 2,
                  },
                }}
              >
                Follow Us
              </Typography>

              <Typography
                sx={{
                  color: alpha(white, 0.5),
                  fontFamily: '"Quicksand", sans-serif',
                  fontSize: '0.85rem',
                  lineHeight: 1.7,
                  mb: 2,
                }}
              >
                Stay connected for latest property updates, market insights, and exclusive offers.
              </Typography>

              {/* Social Icons */}
              <Box sx={{ display: 'flex', gap: 1.5, mb: 2.5 }}>
                {socialIcons.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <IconButton
                      key={index}
                      component="a"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      sx={{
                        width: 44,
                        height: 44,
                        bgcolor: alpha(white, 0.05),
                        border: `1px solid ${alpha(white, 0.08)}`,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: gold,
                          borderColor: gold,
                          transform: 'translateY(-3px)',
                        },
                      }}
                    >
                      <Icon size={18} color={white} />
                    </IconButton>
                  );
                })}
              </Box>

              {/* Business Hours */}
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: alpha(gold, 0.05),
                  border: `1px solid ${alpha(gold, 0.1)}`,
                }}
              >
                <Typography
                  sx={{
                    color: gold,
                    fontFamily: '"Quicksand", sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    mb: 0.5,
                  }}
                >
                  Business Hours
                </Typography>
                <Typography
                  sx={{
                    color: alpha(white, 0.7),
                    fontFamily: '"Quicksand", sans-serif',
                    fontSize: '0.8rem',
                  }}
                >
                  Mon - Sat: 9:00 AM - 7:00 PM
                </Typography>
                <Typography
                  sx={{
                    color: alpha(white, 0.5),
                    fontFamily: '"Quicksand", sans-serif',
                    fontSize: '0.8rem',
                  }}
                >
                  Sunday: By Appointment
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Bottom Bar */}
      <Box
        sx={{
          py: 2,
          bgcolor: footerBgDeep,
          borderTop: `1px solid ${alpha(white, 0.05)}`,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Typography
              suppressHydrationWarning
              sx={{
                color: alpha(white, 0.4),
                fontFamily: '"Quicksand", sans-serif',
                fontSize: '0.8rem',
              }}
            >
              © {new Date().getFullYear()} Fortune DXB. All rights reserved.
            </Typography>

            <Box sx={{ display: 'flex', gap: 3 }}>
              {['Privacy Policy', 'Terms of Service'].map((link) => (
                <Typography
                  key={link}
                  component={Link}
                  href={`/${link.toLowerCase().replace(/ /g, '-')}`}
                  sx={{
                    color: alpha(white, 0.4),
                    fontFamily: '"Quicksand", sans-serif',
                    fontSize: '0.8rem',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: gold,
                    },
                  }}
                >
                  {link}
                </Typography>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
