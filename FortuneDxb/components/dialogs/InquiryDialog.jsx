'use client';
import { useState } from 'react';
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
  IconButton,
  Alert,
  useTheme,
} from '@mui/material';
import { Send, X } from 'lucide-react';
import { useLeadHook } from '@/hooks/lead/useLeadHook';

const InquiryDialog = ({ open, onClose, selectedProject, source = 'Distress Deals' }) => {
  const theme = useTheme();
  const { submitLead, isSubmitting } = useLeadHook();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async () => {
    const projectId = selectedProject?.project_id || selectedProject?.id;
    if (!projectId || !selectedProject?.name) {
      setError('Project information missing');
      return;
    }
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setError('Name and phone are required');
      return;
    }

    const comments = [
      formData.interest && `Interested in: ${formData.interest}`,
      formData.message.trim(),
    ].filter(Boolean).join(' — ');

    const res = await submitLead({
      project_id: projectId,
      project_name: selectedProject.name,
      lead_name: formData.fullName,
      lead_phone: formData.phone,
      lead_email: formData.email,
      lead_source: source,
      comments: comments || null,
    });

    if (res.success) {
      setFormData({ fullName: '', email: '', phone: '', interest: '', message: '' });
      onClose();
    } else {
      setError(res.error || 'Failed to submit inquiry');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          m: { xs: 2, sm: 3 },
          maxHeight: { xs: 'calc(100% - 32px)', sm: 'calc(100% - 64px)' },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Quicksand", sans-serif',
            fontStyle: 'italic',
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          Inquire About {selectedProject?.name || 'Property'}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ py: 2, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {error && (
            <Alert severity="error" sx={{ borderRadius: 1 }}>
              {error}
            </Alert>
          )}
          <TextField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            fullWidth
            required
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
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
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
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            required
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
              name="interest"
              value={formData.interest}
              label="I'm interested in"
              onChange={handleChange}
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
            name="message"
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            placeholder={`I'm interested in ${selectedProject?.name || 'this property'}. Please share more details.`}
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

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={onClose}
          sx={{
            fontFamily: '"Quicksand", sans-serif',
            fontStyle: 'italic',
            color: 'text.secondary',
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting}
          startIcon={<Send size={18} color={theme.palette.common.white} />}
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.gold.main} 0%, ${theme.palette.gold.dark} 100%)`,
            color: 'common.white',
            borderRadius: 1,
            px: 3,
            fontFamily: '"Quicksand", sans-serif',
            fontStyle: 'italic',
            fontWeight: 600,
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.gold.light} 0%, ${theme.palette.gold.main} 100%)`,
            },
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InquiryDialog;