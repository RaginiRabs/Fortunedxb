import React from 'react';
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';
import {
  MessageCircle,
  X,
  Phone,
  Mail,
  Video,
} from 'lucide-react';

const FloatingContactDial = () => {
  return (
    <SpeedDial
      ariaLabel="Contact options"
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
      }}
      icon={<SpeedDialIcon icon={<MessageCircle />} openIcon={<X />} />}
      FabProps={{
        sx: {
          background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #A68B4B 0%, #8B7340 100%)',
          },
        },
      }}
    >
      <SpeedDialAction
        icon={<MessageCircle size={20} />}
        tooltipTitle="WhatsApp"
        sx={{ bgcolor: '#25D366' }}
      />
      <SpeedDialAction
        icon={<Phone size={20} />}
        tooltipTitle="Call Us"
      />
      <SpeedDialAction
        icon={<Mail size={20} />}
        tooltipTitle="Email"
      />
      <SpeedDialAction
        icon={<Video size={20} />}
        tooltipTitle="Video Call"
      />
    </SpeedDial>
  );
};

export default FloatingContactDial;