import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Send } from 'lucide-react';

const InquiryDialog = ({ open, onClose, selectedProject }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 4 }
      }}
    >
      <DialogTitle>
        <Typography variant="h6">
          Inquire About {selectedProject?.name}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Full Name" fullWidth />
          <TextField label="Email" type="email" fullWidth />
          <TextField label="Phone" fullWidth />
          <FormControl fullWidth>
            <InputLabel>I'm interested in</InputLabel>
            <Select label="I'm interested in">
              <MenuItem value="buying">Buying for Self</MenuItem>
              <MenuItem value="investment">Investment</MenuItem>
              <MenuItem value="both">Both</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Message"
            multiline
            rows={3}
            fullWidth
            defaultValue={`I'm interested in ${selectedProject?.name}. Please share more details.`}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          startIcon={<Send size={18} />}
          sx={{
            background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
          }}
        >
          Submit Inquiry
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InquiryDialog;