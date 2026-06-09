'use client';
import { usePathname, useRouter } from 'next/navigation';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  DashboardOutlined,
  BusinessOutlined,
  ApartmentOutlined,
  LocalOfferOutlined,
  ContactPhoneOutlined,
  StorefrontOutlined,
  PeopleOutlined,
  LogoutOutlined,
  FormatQuoteOutlined,
  LockOutlined,
} from '@mui/icons-material';
import Image from 'next/image';

const menuItems = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: DashboardOutlined,
  },
  { divider: true },
  {
    title: 'Developers',
    path: '/admin/developers',
    icon: BusinessOutlined,
  },
  {
    title: 'Projects',
    path: '/admin/projects',
    icon: ApartmentOutlined,
  },
  {
    title: 'Offers',
    path: '/admin/offers',
    icon: LocalOfferOutlined,
  },
  {
    title: 'Testimonials',
    path: '/admin/testimonials',
    icon: FormatQuoteOutlined,
  },
  { divider: true },
  {
    title: 'Leads',
    path: '/admin/leads',
    icon: ContactPhoneOutlined,
  },
  {
    title: 'Seller Leads',
    path: '/admin/seller-leads',
    icon: StorefrontOutlined,
  },
  {
    title: 'Users',
    path: '/admin/users',
    icon: PeopleOutlined,
    adminOnly: true,
  },
  { divider: true },
  {
    title: 'Change Password',
    path: '/admin/change-password',
    icon: LockOutlined,
  },
];

const DRAWER_WIDTH = 250;

export default function Sidebar({ mobileOpen, onClose, user }) {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  // Get user role from user object
  const userRole = user?.role || 'user';

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNavigation = (path) => {
    router.push(path);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const isActive = (path) => {
    if (path === '/admin/dashboard') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => {
    if (item.divider) return true;
    if (item.adminOnly && userRole !== 'admin') return false;
    return true;
  });

  const sidebarContent = (
    <Box
      sx={{
        width: DRAWER_WIDTH,
        height: '100vh',
        bgcolor: 'secondary.main',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          p: 2.5,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {/* Logo Image */}
        <Box
          sx={{
            width: 190,
            height: 80,
            position: 'relative',
          }}
        >
          <Image
            src="/asset/logo.png"
            alt="Fortune DXB Logo"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </Box>
      </Box>

      {/* Menu Items */}
      <List sx={{ flex: 1, py: 2, overflowY: 'auto' }}>
        {filteredMenuItems.map((item, index) => {
          if (item.divider) {
            return (
              <Divider
                key={index}
                sx={{
                  my: 1.5,
                  borderColor: 'rgba(255,255,255,0.1)',
                }}
              />
            );
          }

          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <ListItem key={item.path} disablePadding sx={{ px: 1.5, mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  py: 1.2,
                  bgcolor: active ? 'rgba(198, 169, 98, 0.15)' : 'transparent',
                  '&:hover': {
                    bgcolor: active
                      ? 'rgba(198, 169, 98, 0.2)'
                      : 'rgba(255,255,255,0.05)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Icon
                    sx={{
                      color: active ? 'primary.main' : 'rgba(255,255,255,0.6)',
                      fontSize: 22,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: active ? 600 : 400,
                    color: active ? 'primary.main' : 'rgba(255,255,255,0.8)',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Logout Button */}
      <Box sx={{ p: 1.5, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            py: 1.2,
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.05)',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <LogoutOutlined
              sx={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: 22,
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.8)',
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            border: 'none',
            borderRadius: 0,
          },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* Desktop Sidebar - Fixed Position */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            border: 'none',
            borderRadius: 0,
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
}