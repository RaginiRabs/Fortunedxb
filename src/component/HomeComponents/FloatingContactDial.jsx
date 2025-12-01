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
        '& .MuiSpeedDialAction-staticTooltipLabel': {
          fontFamily: '"Quicksand", sans-serif',
          fontStyle: 'italic',
        },
      }}
      icon={
        <SpeedDialIcon
          icon={<MessageCircle color="#FFFFFF" />}
          openIcon={<X color="#FFFFFF" />}
        />
      }
      FabProps={{
        sx: {
          background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
          borderRadius: 1.5,
          '&:hover': {
            background: 'linear-gradient(135deg, #A68B4B 0%, #8B7340 100%)',
          },
        },
      }}
    >
      <SpeedDialAction
        icon={<MessageCircle size={20} color="#FFFFFF" />}
        tooltipTitle="WhatsApp"
        sx={{
          bgcolor: '#25D366',
          borderRadius: 1,
          '&:hover': {
            bgcolor: '#1DA851',
          },
        }}
      />
      <SpeedDialAction
        icon={<Phone size={20} />}
        tooltipTitle="Call Us"
        sx={{
          borderRadius: 1,
        }}
      />
      <SpeedDialAction
        icon={<Mail size={20} />}
        tooltipTitle="Email"
        sx={{
          borderRadius: 1,
        }}
      />
      <SpeedDialAction
        icon={<Video size={20} />}
        tooltipTitle="Video Call"
        sx={{
          borderRadius: 1,
        }}
      />
    </SpeedDial>
  );
};

export default FloatingContactDial;