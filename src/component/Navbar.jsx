import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Button,
  IconButton,
  Badge,
  Tooltip,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Phone,
  Heart,
  Menu as MenuIcon,
} from 'lucide-react';
import MobileDrawer from './MobileDrawer';
import fortuneLogo from '../assets/logo.PNG';

const Navbar = ({ savedProperties = [] }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuLinks = {
    Projects: "/projects",
    Developers: "/developers",
    Areas: "/areas",
    "Investment Guide": "/investment-guide",
    About: "/about",
  };

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={isScrolled ? 4 : 0}
        sx={{
          bgcolor: isScrolled ? 'rgba(255,255,255,0.98)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          transition: 'all 0.3s ease',
          borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1, px: { xs: 0, md: 2 } }}>

            {/* Logo */}
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
              onClick={() => navigate('/home')}
            >
              <Box
                sx={{
                  width: 110,
                  height: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={fortuneLogo}
                  alt="Fortune Realty Logo"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {Object.keys(menuLinks).map((item) => (
                  <Button
                    key={item}
                    onClick={() => navigate(menuLinks[item])}
                    sx={{
                      color: isScrolled ? 'secondary.main' : 'white',
                      fontWeight: 500,
                      px: 2,
                      '&:hover': {
                        bgcolor: isScrolled
                          ? 'rgba(198, 169, 98, 0.1)'
                          : 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    {item}
                  </Button>
                ))}

                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ mx: 1, borderColor: isScrolled ? 'divider' : 'rgba(255,255,255,0.2)' }}
                />

                <Tooltip title="Saved Properties">
                  <IconButton
                    onClick={() => navigate('/saved-properties')}
                    sx={{ color: isScrolled ? 'secondary.main' : 'white' }}
                  >
                    <Badge badgeContent={savedProperties.length} color="primary">
                      <Heart size={20} />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Button
                  variant="contained"
                  onClick={() => navigate('/contact')}
                  sx={{
                    background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
                    px: 3,
                    ml: 1,
                  }}
                  startIcon={<Phone size={18} />}
                >
                  Contact Us
                </Button>
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                onClick={() => setMobileMenuOpen(true)}
                sx={{ color: isScrolled ? 'secondary.main' : 'white' }}
              >
                <MenuIcon size={24} />
              </IconButton>
            )}

          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <MobileDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
