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
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Quicksand", sans-serif',
            fontStyle: 'italic',
            fontWeight: 600,
          }}
        >
          Inquire About {selectedProject?.name}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Full Name"
            fullWidth
            InputProps={{
              sx: {
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
                borderRadius: 1,
              },
            }}
            InputLabelProps={{
              sx: {
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
              },
            }}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            InputProps={{
              sx: {
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
                borderRadius: 1,
              },
            }}
            InputLabelProps={{
              sx: {
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
              },
            }}
          />
          <TextField
            label="Phone"
            fullWidth
            InputProps={{
              sx: {
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
                borderRadius: 1,
              },
            }}
            InputLabelProps={{
              sx: {
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
              },
            }}
          />
          <FormControl fullWidth>
            <InputLabel
              sx={{
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
              }}
            >
              I'm interested in
            </InputLabel>
            <Select
              label="I'm interested in"
              sx={{
                borderRadius: 1,
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
              }}
            >
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
            InputProps={{
              sx: {
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
                borderRadius: 1,
              },
            }}
            InputLabelProps={{
              sx: {
                fontFamily: '"Quicksand", sans-serif',
                fontStyle: 'italic',
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={onClose}
          sx={{
            fontFamily: '"Quicksand", sans-serif',
            fontStyle: 'italic',
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<Send size={18} color="#FFFFFF" />}
          sx={{
            background: 'linear-gradient(135deg, #C6A962 0%, #A68B4B 100%)',
            color: '#FFFFFF',
            borderRadius: 1,
            fontFamily: '"Quicksand", sans-serif',
            fontStyle: 'italic',
            fontWeight: 600,
            '&:hover': {
              background: 'linear-gradient(135deg, #D4BC7D 0%, #C6A962 100%)',
            },
          }}
        >
          Submit Inquiry
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InquiryDialog;