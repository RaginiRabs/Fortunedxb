'use client';
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import { NotificationsOutlined, MenuOutlined } from '@mui/icons-material';
import useUserHook from '@/hooks/user/useUserHook';

export default function Header({ title, subtitle, onMenuClick }) {
  const { user, loading } = useUserHook();

  // Get user's first letter for avatar
  const getInitial = (name) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  // Format user role (capitalize first letter)
  const formatRole = (role) => {
    if (!role) return '';
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <Box
      sx={{
        height: { xs: 60, sm: 70 },
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'grey.200',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 1.5, sm: 3 },
      }}
    >
      {/* Left - Menu Icon (Mobile) + Page Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
        {/* Menu Icon - Mobile Only */}
        {onMenuClick && (
          <IconButton
            onClick={onMenuClick}
            sx={{
              display: { xs: 'flex', lg: 'none' },
              color: 'secondary.main',
            }}
          >
            <MenuOutlined />
          </IconButton>
        )}

        {/* Page Title */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: 'secondary.main',
              fontStyle: 'normal',
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontStyle: 'normal',
                display: { xs: 'none', sm: 'block' },
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Right - Notifications & Profile */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
        {/* Notifications */}
        <IconButton size="small">
          <NotificationsOutlined
            sx={{
              color: 'text.secondary',
              fontSize: { xs: 20, sm: 24 },
            }}
          />
        </IconButton>

        {/* Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
          <Avatar
            sx={{
              width: { xs: 32, sm: 36 },
              height: { xs: 32, sm: 36 },
              bgcolor: 'primary.main',
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              fontWeight: 600,
            }}
          >
            {!loading && user ? getInitial(user.user_name) : '?'}
          </Avatar>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: 'secondary.main', lineHeight: 1.2 }}
            >
              {!loading && user ? user.user_name : 'Loading...'}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {!loading && user ? formatRole(user.user_role) : 'Loading...'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}