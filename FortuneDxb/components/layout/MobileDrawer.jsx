'use client';
import { useRouter } from 'next/navigation';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Divider,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  X,
  ChevronRight,
  Phone,
  Home,
  Building2,
  Users,
  MapPin,
  BookOpen,
  Info,
  Mail,
  Flame,
} from 'lucide-react';
import { BRAND_COLORS } from '@/lib/theme';

const menuItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Projects', href: '/projects', icon: Building2 },
  { label: 'Distress Deals', href: '/distress-deals', icon: Flame },
  { label: 'Developers', href: '/developers', icon: Users },
  { label: 'Areas', href: '/areas', icon: MapPin },
  { label: 'Investment Guide', href: '/investment-guide', icon: BookOpen },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Contact', href: '/contact', icon: Mail },
];

const MobileDrawer = ({ open, onClose }) => {
  const router = useRouter();
  const theme = useTheme();

  const handleNavigation = (href) => {
    router.push(href);
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: 280, sm: 320 }, // Fixed width, not full screen
          maxWidth: '85%',
          p: 2,
          bgcolor: 'background.paper',
          borderRadius: 1, // No border radius
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          pb: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: '1.2rem',
              color: 'text.primary',
            }}
          >
            FORTUNE
            <Box
              component="span"
              sx={{
                color: 'primary.main',
                fontFamily: '"Quicksand", sans-serif',
                fontWeight: 600,
                fontSize: '0.75rem',
                ml: 1,
                letterSpacing: 2,
              }}
            >
              DXB
            </Box>
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            bgcolor: alpha(theme.palette.text.primary, 0.05),
            borderRadius: 1,
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          <X size={20} color={theme.palette.text.primary} />
        </IconButton>
      </Box>

      {/* Menu Items */}
      <List sx={{ flex: 1, py: 0 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem key={item.label} disablePadding sx={{ mb: 0.25 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.href)}
                sx={{
                  borderRadius: 1,
                  py: 1.25,
                  px: 1.5,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    '& .menu-icon': {
                      color: theme.palette.primary.main,
                    },
                    '& .menu-arrow': {
                      transform: 'translateX(4px)',
                      color: theme.palette.primary.main,
                    },
                  },
                }}
              >
                <Icon
                  size={18}
                  className="menu-icon"
                  style={{
                    marginRight: 10,
                    color: theme.palette.text.secondary,
                    transition: 'color 0.3s ease',
                  }}
                />
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontFamily: '"Quicksand", sans-serif',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: 'text.primary',
                  }}
                />
                <ChevronRight
                  size={16}
                  className="menu-arrow"
                  style={{
                    color: theme.palette.text.disabled,
                    transition: 'all 0.3s ease',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ my: 1.5 }} />

      {/* CTA Buttons */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button
          fullWidth
          variant="contained"
          component="a"
          href="tel:+971582335969"
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.dark} 100%)`,
            color: theme.palette.common.white,
            py: 1.25,
            borderRadius: 1,
            fontFamily: '"Quicksand", sans-serif',
            fontWeight: 600,
            fontSize: '0.85rem',
            boxShadow: `0 4px 15px ${alpha(theme.palette.gold.main, 0.3)}`,
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.gold.light} 0%, ${theme.palette.gold.main} 100%)`,
            },
          }}
          startIcon={<Phone size={16} />}
        >
          Call Now
        </Button>

        <Button
          fullWidth
          variant="outlined"
          component="a"
          href="https://api.whatsapp.com/send?phone=+971582335969&text=Hello,%20I%20Am%20Interested%20In%20Dubai%20Properties"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            borderColor: BRAND_COLORS.whatsapp,
            color: BRAND_COLORS.whatsapp,
            py: 1.25,
            borderRadius: 1,
            fontFamily: '"Quicksand", sans-serif',
            fontWeight: 600,
            fontSize: '0.85rem',
            '&:hover': {
              borderColor: BRAND_COLORS.whatsapp,
              bgcolor: alpha(BRAND_COLORS.whatsapp, 0.08),
            },
          }}
        >
          WhatsApp Us
        </Button>
      </Box>

      {/* Contact Info */}
      <Box
        sx={{
          mt: 2,
          p: 1.5,
          bgcolor: 'background.subtle',
          borderRadius: 1,
        }}
      >
        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: '0.7rem',
            fontFamily: '"Quicksand", sans-serif',
            textAlign: 'center',
          }}
        >
          📍 Business Bay, Dubai, UAE
        </Typography>
        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: '0.7rem',
            fontFamily: '"Quicksand", sans-serif',
            textAlign: 'center',
            mt: 0.5,
          }}
        >
          ✉️ info@fortunedxb.com
        </Typography>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;
