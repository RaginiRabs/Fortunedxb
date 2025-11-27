import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
} from '@mui/material';
import {
  X,
  ChevronRight,
  Phone,
} from 'lucide-react';

const MobileDrawer = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 300, p: 2 }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Menu</Typography>
        <IconButton onClick={onClose}>
          <X size={24} />
        </IconButton>
      </Box>
      <List>
        {['Projects', 'Developers', 'Areas', 'Investment Guide', 'About', 'Contact'].map((item) => (
          <ListItem 
            key={item} 
            button 
            sx={{ borderRadius: 2, mb: 1 }}
            onClick={() => handleNavigation(`/${item.toLowerCase().replace(' ', '-')}`)}
          >
            <ListItemText primary={item} />
            <ChevronRight size={20} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Button
        fullWidth
        variant="contained"
        sx={{ background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)' }}
        startIcon={<Phone size={18} />}
      >
        Call Now
      </Button>
    </Drawer>
  );
};

export default MobileDrawer;