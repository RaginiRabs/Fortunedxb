'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Box,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';

const DRAWER_WIDTH = 250;

// Page titles config
const PAGE_CONFIG = {
  '/admin/dashboard': {
    title: 'Dashboard',
    subtitle: 'Welcome back! Here\'s what\'s happening.',
  },
  '/admin/developers': {
    title: 'Developers',
    subtitle: 'Manage property developers',
  },
  '/admin/developers/add': {
    title: 'Add Developer',
    subtitle: 'Create a new developer profile',
  },
  '/admin/projects': {
    title: 'Projects',
    subtitle: 'Manage property projects',
  },
  '/admin/projects/add': {
    title: 'Add Project',
    subtitle: 'Create a new project listing',
  },
  '/admin/offers': {
    title: 'Offers',
    subtitle: 'Manage special offers and promotions',
  },
  '/admin/offers/add': {
    title: 'Add Offer',
    subtitle: 'Create a new offer',
  },
  '/admin/leads': {
    title: 'Leads',
    subtitle: 'View and manage customer inquiries',
  },
  '/admin/users': {
    title: 'Users',
    subtitle: 'Manage admin users',
  },
  '/admin/testimonials': {
    title: 'Testimonials',
    subtitle: 'Manage customer testimonials',
  },
  '/admin/testimonials/add': {
    title: 'Add Testimonial',
    subtitle: 'Create a new testimonial',
  },
  '/admin/change-password': {
    title: 'Change Password',
    subtitle: 'Update your account password',
  },
};

// Get page config based on pathname
function getPageConfig(pathname) {
  if (PAGE_CONFIG[pathname]) {
    return PAGE_CONFIG[pathname];
  }

  // Dynamic routes
  if (pathname.match(/^\/admin\/developers\/\d+$/)) {
    return { title: 'Edit Developer', subtitle: 'Update developer details' };
  }
  if (pathname.match(/^\/admin\/developers\/view\/\d+$/)) {
    return { title: 'View Developer', subtitle: 'Developer details' };
  }
  if (pathname.match(/^\/admin\/projects\/edit\/\d+/)) {
    return { title: 'Edit Project', subtitle: 'Update project details' };
  }
  if (pathname.match(/^\/admin\/projects\/view\/\d+$/)) {
    return { title: 'View Project', subtitle: 'Project details' };
  }
  if (pathname.match(/^\/admin\/offers\/\d+$/)) {
    return { title: 'Edit Offer', subtitle: 'Update offer details' };
  }
  if (pathname.match(/^\/admin\/testimonials\/\d+$/)) {
    return { title: 'Edit Testimonial', subtitle: 'Update testimonial details' };
  }

  return { title: 'Admin', subtitle: '' };
}

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pageConfig = getPageConfig(pathname);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await fetch('/api/auth/verify');
        const data = await res.json();

        if (!data.valid) {
          router.replace('/admin/login');
          return;
        }

        setUser(data.user);
        setLoading(false);
      } catch (error) {
        console.error('Session verification failed:', error);
        router.replace('/admin/login');
      }
    };

    verifySession();
  }, [router]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          bgcolor: 'navy.main',
        }}
      >
        <CircularProgress sx={{ color: 'gold.main' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar
        user={user}
        mobileOpen={mobileOpen}
        onClose={handleDrawerToggle}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'grey.50',
          minHeight: '100vh',
          overflow: 'auto',
          width: '100%',
          ml: { lg: `${DRAWER_WIDTH}px` },
        }}
      >
        {/* Header with Menu Icon for Mobile */}
        <Header
          title={pageConfig.title}
          subtitle={pageConfig.subtitle}
          user={user}
          onMenuClick={handleDrawerToggle}
        />

        {/* Page Content */}
        <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}