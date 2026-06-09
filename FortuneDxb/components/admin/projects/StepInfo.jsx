'use client';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  ArrowForwardOutlined,
  ArrowBackOutlined,
  EmailOutlined,
} from '@mui/icons-material';
import { MuiTelInput } from 'mui-tel-input';
import { useProjectForm } from '@/contexts/ProjectFormContext';
import { FURNISHING_STATUS } from '@/data/projectTypes';

/**
 * Extract only the phone number without country code
 * Input: "+971 50 123 4567" or "+91 98765 43210"
 * Output: "501234567" or "9876543210"
 */
const extractPhoneNumber = (fullValue, countryCode) => {
  if (!fullValue) return '';
  
  // Remove all spaces and special characters except +
  let cleaned = fullValue.replace(/[\s\-\(\)]/g, '');
  
  // Remove the + and country code from the beginning
  if (countryCode && cleaned.startsWith(`+${countryCode}`)) {
    cleaned = cleaned.substring(countryCode.length + 1);
  } else if (cleaned.startsWith('+')) {
    // Try to remove any country code (find first digit sequence after +)
    const match = cleaned.match(/^\+(\d+)/);
    if (match) {
      // Remove the country code part
      cleaned = cleaned.substring(match[0].length);
    }
  }
  
  // Remove any remaining + sign
  cleaned = cleaned.replace(/\+/g, '');
  
  return cleaned;
};

/**
 * Format phone number for display in MuiTelInput
 * Combines country code and phone number
 */
const formatPhoneForDisplay = (phoneNumber, countryCode) => {
  if (!phoneNumber) return '';
  if (countryCode) {
    return `+${countryCode}${phoneNumber}`;
  }
  return phoneNumber;
};

export default function StepInfo() {
  const router = useRouter();
  const { formData, updateField, updateFields, nextStep, prevStep, editMode, projectId } = useProjectForm();

  // Get display values for phone inputs
  const phone1Display = formatPhoneForDisplay(formData.phone_1, formData.phone_1_ccode);
  const phone2Display = formatPhoneForDisplay(formData.phone_2, formData.phone_2_ccode);

  // Phone handlers - extract only the number part
  const handlePhone1Change = (value, info) => {
    const countryCode = info?.countryCallingCode || '';
    const phoneNumber = extractPhoneNumber(value, countryCode);
    
    updateFields({
      phone_1: phoneNumber,           // Only the number: "501234567"
      phone_1_ccode: countryCode,     // Only the code: "971"
    });
  };

  const handlePhone2Change = (value, info) => {
    const countryCode = info?.countryCallingCode || '';
    const phoneNumber = extractPhoneNumber(value, countryCode);
    
    updateFields({
      phone_2: phoneNumber,           // Only the number: "41234567"
      phone_2_ccode: countryCode,     // Only the code: "971"
    });
  };

  const handleNext = () => {
    if (nextStep()) {
      const basePath = editMode ? `/admin/projects/edit/${projectId}` : '/admin/projects/add';
      router.push(`${basePath}/pricing`);
    }
  };

  const handleBack = () => {
    prevStep();
    const basePath = editMode ? `/admin/projects/edit/${projectId}` : '/admin/projects/add';
    router.push(`${basePath}/basic`);
  };

  return (
    <Box>
      {/* Project Information */}
      <Card
        elevation={0}
        sx={{ p: 3, mb: 3, borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          Project Information
        </Typography>

        <Grid container spacing={3}>
          {/* Total Towers */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              type="number"
              label="Total Towers"
              value={formData.total_towers}
              onChange={(e) => updateField('total_towers', e.target.value)}
              inputProps={{ min: 0 }}
            />
          </Grid>

          {/* Total Units */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              type="number"
              label="Total Units"
              value={formData.total_units}
              onChange={(e) => updateField('total_units', e.target.value)}
              inputProps={{ min: 0 }}
            />
          </Grid>

          {/* Sold Percentage — direct value, total units not required */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              type="number"
              label="Sold (%)"
              value={formData.units_sold}
              onChange={(e) => updateField('units_sold', e.target.value)}
              inputProps={{ min: 0, max: 100 }}
              helperText="0–100, shown on project card"
            />
          </Grid>

          {/* Furnishing Status */}
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Furnishing Status</InputLabel>
              <Select
                value={formData.furnishing_status}
                onChange={(e) => updateField('furnishing_status', e.target.value)}
                label="Furnishing Status"
              >
                {FURNISHING_STATUS.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Handover Date */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              type="date"
              label="Handover Date"
              value={formData.handover_date}
              onChange={(e) => updateField('handover_date', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Featured Switch */}
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.featured}
                  onChange={(e) => {
                    updateField('featured', e.target.checked);
                    if (e.target.checked) updateField('is_distress_deal', false);
                  }}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: 'primary.main',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      bgcolor: 'primary.main',
                    },
                  }}
                />
              }
              label="Featured Project"
              sx={{ mt: 1 }}
            />
          </Grid>

          {/* Distress Deal Switch */}
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.is_distress_deal}
                  onChange={(e) => {
                    updateField('is_distress_deal', e.target.checked);
                    if (e.target.checked) updateField('featured', false);
                  }}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: 'primary.main',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      bgcolor: 'primary.main',
                    },
                  }}
                />
              }
              label="Distress Deal"
              sx={{ mt: 1 }}
            />
          </Grid>
        </Grid>
      </Card>

      {/* Contact Information */}
      <Card
        elevation={0}
        sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          Contact Information
        </Typography>

        <Grid container spacing={3}>
          {/* Email 1 */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Email 1"
              value={formData.email_1 || ''}
              onChange={(e) => updateField('email_1', e.target.value)}
              placeholder="sales@fortunedxb.com"
              InputProps={{
                startAdornment: <EmailOutlined sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />,
              }}
            />
          </Grid>

          {/* Email 2 */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Email 2"
              value={formData.email_2 || ''}
              onChange={(e) => updateField('email_2', e.target.value)}
              placeholder="info@fortunedxb.com"
              InputProps={{
                startAdornment: <EmailOutlined sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />,
              }}
            />
          </Grid>

          {/* Phone 1 */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MuiTelInput
              fullWidth
              label="Phone 1"
              value={phone1Display}
              onChange={handlePhone1Change}
              defaultCountry="AE"
              preferredCountries={['AE', 'SA', 'IN', 'PK', 'GB', 'US']}
              forceCallingCode
              focusOnSelectCountry
              placeholder="50 123 4567"
              helperText={formData.phone_1 ? `Stored: +${formData.phone_1_ccode} ${formData.phone_1}` : ''}
            />
          </Grid>

          {/* Phone 2 */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MuiTelInput
              fullWidth
              label="Phone 2"
              value={phone2Display}
              onChange={handlePhone2Change}
              defaultCountry="AE"
              preferredCountries={['AE', 'SA', 'IN', 'PK', 'GB', 'US']}
              forceCallingCode
              focusOnSelectCountry
              placeholder="4 123 4567"
              helperText={formData.phone_2 ? `Stored: +${formData.phone_2_ccode} ${formData.phone_2}` : ''}
            />
          </Grid>
        </Grid>
      </Card>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackOutlined />}
          onClick={handleBack}
          sx={{
            borderColor: 'grey.300',
            color: 'text.secondary',
            '&:hover': { borderColor: 'grey.400', bgcolor: 'grey.50' },
          }}
        >
          Back
        </Button>

        <Button
          variant="contained"
          endIcon={<ArrowForwardOutlined />}
          onClick={handleNext}
          sx={{
            bgcolor: 'primary.main',
            px: 4,
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}