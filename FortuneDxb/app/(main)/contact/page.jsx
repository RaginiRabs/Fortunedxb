'use client';
import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  keyframes,
  useTheme
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Clock,
  Send,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

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

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

// ============ IMAGE URLS ============
const IMAGES = {
  heroBackground: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop',
  contactBg: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2000&auto=format&fit=crop',
};

// ============ HOOKS ============
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
const SimpleHeader = () => {
  const theme = useTheme();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <Box
      ref={ref}
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.navy.main} 0%, ${theme.palette.navy.light} 100%)`,
        pt: { xs: 12, md: 20},
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
          Get in{' '}
          <Box
            component="span"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.pale} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontStyle: 'italic',
            }}
          >
            Touch
          </Box>
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            color: 'text.disabled',
            fontSize: '0.95rem',
            fontFamily: '"Quicksand", sans-serif',
            maxWidth: 600,
            mb: 0,
            animation: isVisible ? `${fadeInUp} 0.6s ease-out 0.2s both` : 'none',
          }}
        >
          Have questions? We'd love to hear from you. Contact Fortune Realty LLC for expert guidance on your Dubai real estate journey.
        </Typography>
      </Container>
    </Box>
  );
};

// ============ CONTACT FORM & INFO SECTION ============
const ContactSection = () => {
  const theme = useTheme();
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const contactDetails = [
    {
      icon: Phone,
      title: 'Phone Number',
      value: '+971 58 233 5969',
      link: 'tel:+971582335969',
    },
    {
      icon: Mail,
      title: 'Email Address',
      value: 'fortunerealtyllc@gmail.com',
      link: 'mailto:fortunerealtyllc@gmail.com',
    },
    {
      icon: MapPin,
      title: 'Office Address',
      value: '102, Nazir Al Awadhi Building,\nAl Garhoud, Dubai, UAE',
      link: null,
    },
    {
      icon: Clock,
      title: 'Working Hours',
      value: 'Mon - Sat: 9:00 AM - 8:00 PM\nSunday: By Appointment',
      link: null,
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  // Updated input styles - WHITE & NAVY
  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      bgcolor: 'background.paper',
      borderRadius: 1.5,
      transition: 'all 0.3s ease',
      '& fieldset': {
        borderColor: alpha(theme.palette.navy.main, 0.25),
        borderWidth: '1.5px',
      },
      '&:hover fieldset': {
        borderColor: alpha(theme.palette.navy.main, 0.5),
      },
      '&.Mui-focused fieldset': {
        borderColor: 'gold.main',
        borderWidth: '2px',
      },
    },
    '& .MuiOutlinedInput-input': {
      color: 'text.primary',
      fontSize: '0.95rem',
      py: 1.75,
      '&::placeholder': {
        color: 'text.disabled',
        opacity: 1,
      },
    },
    '& .MuiInputLabel-root': {
      color: 'text.primary',
      fontSize: '0.95rem',
      '&.Mui-focused': {
        color: 'gold.main',
      },
    },
  };

  return (
    <Box
      ref={ref}
      sx={{
        py: { xs: 8, md: 12 },
        background: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography sx={{
            color: 'gold.main',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            mb: 2,
            animation: isVisible ? `${fadeInUp} 0.6s ease-out` : 'none'
          }}>
            Contact Us
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
            Send Us a{' '}
            <Box component="span" sx={{ color: 'gold.main', fontStyle: 'italic' }}>
              Message
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* LEFT SIDE - Contact Form */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <Box
              sx={{
                p: { xs: 3, md: 5 },
                background: theme.palette.background.paper,
                border: `2px solid ${theme.palette.gold.main}`,
                borderRadius: 3,
                boxShadow: '0 10px 40px rgba(11, 26, 42, 0.08)',
                animation: isVisible ? `${fadeInLeft} 0.8s ease-out` : 'none',
              }}
            >
              <Typography
                sx={{
                  color: 'text.primary',
                  fontSize: '0.95rem',
                  mb: 4,
                  lineHeight: 1.7,
                  fontWeight: 500,
                }}
              >
                Fill out the form below and our team will get back to you within 24 hours
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      name="name"
                      label="Full Name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      sx={inputStyles}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      name="email"
                      label="Email Address"
                      placeholder="john@example.com"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      sx={inputStyles}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      name="phone"
                      label="Phone Number"
                      placeholder="+971 58 233 5969"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      sx={inputStyles}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      name="subject"
                      label="Subject"
                      placeholder="Property Inquiry"
                      value={formData.subject}
                      onChange={handleChange}
                      sx={inputStyles}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      name="message"
                      label="Your Message"
                      placeholder="Tell us about your requirements..."
                      multiline
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      sx={inputStyles}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="consent"
                          checked={formData.consent}
                          onChange={handleChange}
                          required
                          sx={{
                            color: 'text.primary',
                            '&.Mui-checked': {
                              color: 'gold.main',
                            },
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ color: 'text.primary', fontSize: '0.85rem' }}>
                          I agree to be contacted by Fortune Realty LLC regarding my inquiry
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Box
                      component="button"
                      type="submit"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1.5,
                        background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.light} 50%, ${theme.palette.gold.main} 100%)`,
                        color: 'navy.main',
                        fontWeight: 600,
                        px: 5,
                        py: 1.75,
                        borderRadius: 1,
                        textTransform: 'none',
                        fontSize: '1rem',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 10px 40px rgba(198, 169, 98, 0.3)',
                        transition: 'all 0.3s ease',
                        fontFamily: '"Quicksand", sans-serif',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 15px 50px rgba(198, 169, 98, 0.4)',
                        },
                      }}
                    >
                      Send Message <Send size={18} />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>

          {/* RIGHT SIDE - Contact Information */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <Box sx={{
              position: 'sticky',
              top: 100,
              animation: isVisible ? `${fadeInRight} 0.8s ease-out` : 'none'
            }}>
              {/* Contact Details Cards */}
              <Grid container spacing={2.5} sx={{ mb: 4 }}>
                {contactDetails.map((item, index) => (
                  <Grid size={{ xs: 12, sm: 6, lg: 12 }} key={index}>
                    <Box
                      component={item.link ? 'a' : 'div'}
                      href={item.link || undefined}
                      sx={{
                        p: 3,
                        background: theme.palette.background.paper,
                        border: `1.5px solid ${alpha(theme.palette.navy.main, 0.125)}`,
                        borderLeft: `4px solid ${theme.palette.gold.main}`,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2.5,
                        transition: 'all 0.3s ease',
                        textDecoration: 'none',
                        cursor: item.link ? 'pointer' : 'default',
                        '&:hover': item.link ? {
                          borderColor: alpha(theme.palette.navy.main, 0.25),
                          borderLeftColor: 'gold.main',
                          transform: 'translateX(5px)',
                          boxShadow: '0 12px 40px rgba(11, 26, 42, 0.12)',
                        } : {},
                      }}
                    >
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: 2,
                          border: `2px solid ${alpha(theme.palette.gold.main, 0.125)}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: alpha(theme.palette.gold.main, 0.0625),
                          flexShrink: 0,
                        }}
                      >
                        <item.icon size={22} color={theme.palette.gold.main} />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            color: 'gold.main',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            mb: 0.5,
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px',
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: 'text.primary',
                            fontSize: '0.95rem',
                            lineHeight: 1.6,
                            whiteSpace: 'pre-line',
                            fontWeight: 500,
                          }}
                        >
                          {item.value}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* Social Media */}
              <Box
                sx={{
                  p: 4,
                  background: theme.palette.background.paper,
                  border: `2px solid ${alpha(theme.palette.navy.main, 0.125)}`,
                  borderRadius: 2,
                  textAlign: 'center',
                  boxShadow: '0 5px 20px rgba(11, 26, 42, 0.08)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 3 }}>
                  <MessageSquare size={18} color={theme.palette.gold.main} />
                  <Typography
                    sx={{
                      color: 'text.primary',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                    }}
                  >
                    Follow Us
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  {socialLinks.map((social, index) => (
                    <Box
                      key={index}
                      component="a"
                      href={social.href}
                      aria-label={social.label}
                      sx={{
                        width: 45,
                        height: 45,
                        borderRadius: '50%',
                        border: `1.5px solid ${alpha(theme.palette.navy.main, 0.19)}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'background.subtle',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: 'gold.main',
                          borderColor: 'gold.main',
                          transform: 'translateY(-5px)',
                          boxShadow: '0 12px 30px rgba(198, 169, 98, 0.3)',
                          '& svg': {
                            color: 'common.white',
                          },
                        },
                      }}
                    >
                      <social.icon size={18} color={theme.palette.text.primary} />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// ============ MAP SECTION ============
const MapSection = () => {
  const theme = useTheme();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <Box
      ref={ref}
      sx={{
        py: { xs: 6, md: 10 },
        background: theme.palette.background.subtle,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography sx={{
            color: 'gold.main',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            mb: 2,
            animation: isVisible ? `${fadeInUp} 0.6s ease-out` : 'none'
          }}>
            Our Location
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontFamily: '"Playfair Display", Georgia, serif',
              color: 'text.primary',
              fontWeight: 400,
              mb: 2,
              animation: isVisible ? `${fadeInUp} 0.6s ease-out 0.1s both` : 'none'
            }}
          >
            Find Us on{' '}
            <Box component="span" sx={{ color: 'gold.main', fontStyle: 'italic' }}>
              Map
            </Box>
          </Typography>
          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: '0.95rem',
              maxWidth: 600,
              mx: 'auto',
              animation: isVisible ? `${fadeInUp} 0.6s ease-out 0.2s both` : 'none'
            }}
          >
            Visit our office in Al Garhoud, Dubai for a personalized consultation
          </Typography>
        </Box>

        <Box
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            border: `2px solid ${theme.palette.gold.main}`,
            boxShadow: '0 20px 60px rgba(11,26,42,0.15)',
            height: { xs: '400px', md: '500px' },
            animation: isVisible ? `${fadeInUp} 0.8s ease-out 0.3s both` : 'none'
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.2961234567!2d55.33!3d25.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE1JzAwLjAiTiA1NcKwMTknNDguMCJF!5e0!3m2!1sen!2sae!4v1234567890123!5m2!1sen!2sae"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Fortune Realty LLC Location"
          />
        </Box>

        {/* Quick Directions */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {[
            { label: 'FROM AIRPORT', desc: '10 minutes drive from Dubai International Airport' },
            { label: 'PUBLIC TRANSPORT', desc: 'Near Al Garhoud Metro Station' },
            { label: 'PARKING', desc: 'Free parking available at the building' },
          ].map((item, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: 'background.paper',
                  border: `2px solid ${alpha(theme.palette.gold.main, 0.19)}`,
                  borderRadius: 2,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  animation: isVisible ? `${fadeInUp} 0.6s ease-out ${0.4 + index * 0.1}s both` : 'none',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    borderColor: 'gold.main',
                    boxShadow: '0 10px 30px rgba(198,169,98,0.2)',
                  },
                }}
              >
                <Typography sx={{
                  color: 'gold.main',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  mb: 1,
                  letterSpacing: '1.5px'
                }}>
                  {item.label}
                </Typography>
                <Typography sx={{
                  color: 'text.primary',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  lineHeight: 1.6
                }}>
                  {item.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// ============ MAIN PAGE COMPONENT ============
const ContactUsPage = () => {
  return (
    <Box
      sx={{
        bgcolor: 'navy.main',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <SimpleHeader />
      <ContactSection />
      <MapSection />
    </Box>
  );
};

export default ContactUsPage;