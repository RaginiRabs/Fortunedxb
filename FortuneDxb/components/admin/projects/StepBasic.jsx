'use client';
import { useState, useEffect, useRef } from 'react';
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
  Alert,
  InputAdornment,
  Tooltip,
  Autocomplete,
} from '@mui/material';
import {
  ArrowForwardOutlined,
  ArrowBackOutlined,
  InfoOutlined,
} from '@mui/icons-material';
import { useProjectForm } from '@/contexts/ProjectFormContext';
import {
  COUNTRIES,
  getStatesByCountryName,
  getCitiesByStateName,
  getLocalitiesByCityName,
  DEFAULT_COUNTRY,
} from '@/data/countrystatecitylocality';
import { PROJECT_TYPES, USAGE_TYPES, PROJECT_STATUS } from '@/data/projectTypes';
import FileUpload from '@/components/admin/FileUpload';
import { getCityCode, getDeveloperInitials } from '@/lib/generateProjectCode';
import api from '@/lib/axios';

export default function StepBasic() {
  const router = useRouter();
  const { formData, updateField, updateFields, errors, nextStep, editMode, projectId, isLoading } = useProjectForm();
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customProjectType, setCustomProjectType] = useState('');

  const editDataLoadedRef = useRef(false);

  const [availableStates, setAvailableStates] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [availableLocalities, setAvailableLocalities] = useState([]);

  useEffect(() => {
    fetchDevelopers();
  }, []);



  useEffect(() => {
    if (!editMode && !formData.country) {
      updateField('country', DEFAULT_COUNTRY);
    }
  }, [editMode]);

  useEffect(() => {
    if (editMode && !isLoading && formData.country && !editDataLoadedRef.current) {

      const states = getStatesByCountryName(formData.country);
      setAvailableStates(states);

      if (formData.state) {
        const cities = getCitiesByStateName(formData.state);
        setAvailableCities(cities);
      }

      if (formData.city) {
        const localities = getLocalitiesByCityName(formData.city);
        setAvailableLocalities(localities);
      }

      editDataLoadedRef.current = true;
    }
  }, [editMode, isLoading, formData.country, formData.state, formData.city]);

  useEffect(() => {
    if (!editMode && formData.country) {
      const states = getStatesByCountryName(formData.country);
      setAvailableStates(states);

      if (formData.state && !states.find(s => s.name === formData.state)) {
        updateFields({ state: '', city: '', locality: '' });
        setAvailableCities([]);
        setAvailableLocalities([]);
      }
    }
  }, [formData.country, editMode]);

  useEffect(() => {
    if (!editMode && formData.state) {
      const cities = getCitiesByStateName(formData.state);
      setAvailableCities(cities);

      if (formData.city && !cities.find(c => c.name === formData.city)) {
        updateFields({ city: '', locality: '' });
        setAvailableLocalities([]);
      }
    }
  }, [formData.state, editMode]);

  useEffect(() => {
    if (!editMode && formData.city) {
      const localities = getLocalitiesByCityName(formData.city);
      setAvailableLocalities(localities);

      if (formData.locality && !localities.find(l => l.name === formData.locality)) {
        updateField('locality', '');
      }
    }
  }, [formData.city, editMode]);

  useEffect(() => {
    if (formData.project_type && !PROJECT_TYPES.includes(formData.project_type) && formData.project_type !== 'Other') {
      setCustomProjectType(formData.project_type);
    }
  }, [formData.project_type]);

  useEffect(() => {
    if (!editMode && formData.developer_id && formData.city && developers.length > 0) {
      generateProjectCode();
    }
  }, [formData.developer_id, formData.city, editMode, developers]);

  const fetchDevelopers = async () => {
    try {
      const res = await api.get('/api/developers/all');
      if (res.data.success) {
        setDevelopers(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch developers:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateProjectCode = async () => {
    const developer = developers.find(d => d.developer_id === formData.developer_id);
    if (!developer || !formData.city) return;

    const cityCode = getCityCode(formData.city);
    const devInitials = getDeveloperInitials(developer.name);
    const year = new Date().getFullYear();

    try {
      const res = await api.get('/api/projects/next-sequence', {
        params: { year, city: formData.city }
      });

      const sequence = res.data.success ? res.data.sequence : 1;
      const sequenceStr = String(sequence).padStart(3, '0');
      const code = `${cityCode}-${devInitials}${year}${sequenceStr}`;

      updateField('project_code', code);
    } catch (err) {
      const timestamp = Date.now().toString().slice(-3);
      const code = `${cityCode}-${devInitials}${year}${timestamp}`;
      updateField('project_code', code);
    }
  };

  const getExistingLogo = () => {
    if (formData.project_logo_preview) {
      return formData.project_logo_preview.startsWith('/')
        ? formData.project_logo_preview.substring(1)
        : formData.project_logo_preview;
    }
    return null;
  };

  const isCustomProjectType = () => {
    return formData.project_type === 'Other' ||
      (formData.project_type && !PROJECT_TYPES.slice(0, -1).includes(formData.project_type));
  };

  const getProjectTypeSelectValue = () => {
    if (!formData.project_type) return '';
    if (PROJECT_TYPES.slice(0, -1).includes(formData.project_type)) {
      return formData.project_type;
    }
    return 'Other';
  };

  const handleProjectTypeChange = (value) => {
    if (value === 'Other') {
      updateField('project_type', 'Other');
      setCustomProjectType('');
    } else {
      updateField('project_type', value);
      setCustomProjectType('');
    }
  };

  const handleCustomProjectTypeChange = (value) => {
    setCustomProjectType(value);
    if (value.trim()) {
      updateField('project_type', value.trim());
    }
  };

  const handleCountryChange = (countryName) => {
    if (editMode) return;
    updateFields({
      country: countryName,
      state: '',
      city: '',
      locality: '',
    });
  };

  const handleStateChange = (stateName) => {
    if (editMode) return;
    updateFields({
      state: stateName,
      city: '',
      locality: '',
    });
  };

  const handleCityChange = (cityName) => {
    if (editMode) return;
    updateFields({
      city: cityName,
      locality: '',
    });
  };


  const handleNext = () => {
    if (nextStep()) {
      const basePath = editMode ? `/admin/projects/edit/${projectId}` : '/admin/projects/add';
      router.push(`${basePath}/info`);
    }
  };

  const handleCancel = () => {
    router.push('/admin/projects');
  };

  return (
    <Box>
      {Object.keys(errors).length > 0 && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          Please fill all required fields
        </Alert>
      )}

      <Card
        elevation={0}
        sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          Basic Details
        </Typography>

        <Grid container spacing={3}>
          {/* Row 0: Manual Project ID - FIXED: Show value properly */}
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              label={editMode ? "Project ID" : "Project ID (Optional)"}
              value={editMode ? (formData.project_id || '') : (formData.manual_project_id || '')}
              onChange={(e) => updateField('manual_project_id', e.target.value)}
              disabled={editMode}
              placeholder={editMode ? "" : "Leave empty for auto-increment"}
              helperText={editMode ? "Cannot change in edit mode" : "leave empty for auto ID"}
              type="number"
              inputProps={{ min: 1 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: editMode ? 'grey.100' : 'transparent',
                }
              }}
            />
          </Grid>

          {/* Row 1: Developer + Project Name + Sub Headline */}
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth required error={Boolean(errors.developer_id)}>
              <InputLabel>Developer</InputLabel>
              <Select
                value={formData.developer_id}
                onChange={(e) => updateField('developer_id', e.target.value)}
                label="Developer"
                disabled={editMode}
              >
                {developers.map((dev) => (
                  <MenuItem key={dev.developer_id} value={dev.developer_id}>
                    {dev.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.developer_id && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                  {errors.developer_id}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              required
              label="Project Name"
              value={formData.project_name}
              onChange={(e) => updateField('project_name', e.target.value)}
              error={Boolean(errors.project_name)}
              helperText={errors.project_name}
              disabled={editMode}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="Sub Headline"
              value={formData.sub_headline}
              onChange={(e) => updateField('sub_headline', e.target.value)}
              placeholder="e.g., Luxury living redefined"
            />
          </Grid>

          {/* Row 2: Country, State/Emirate, City, Locality */}
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth required error={Boolean(errors.country)} disabled={editMode}>
              <InputLabel>Country</InputLabel>
              <Select
                value={formData.country || ''}
                onChange={(e) => handleCountryChange(e.target.value)}
                label="Country"
              >
                {COUNTRIES.map((country) => (
                  <MenuItem key={country.code} value={country.name}>
                    {country.flag} {country.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.country && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                  {errors.country}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth required error={Boolean(errors.state)} disabled={editMode}>
              <InputLabel>Emirate</InputLabel>
              <Select
                value={formData.state || ''}
                onChange={(e) => handleStateChange(e.target.value)}
                label="Emirate"
              >
                {availableStates.map((state) => (
                  <MenuItem key={state.stateCode} value={state.name}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.state && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                  {errors.state}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth required error={Boolean(errors.city)} disabled={editMode}>
              <InputLabel>City</InputLabel>
              <Select
                value={formData.city || ''}
                onChange={(e) => handleCityChange(e.target.value)}
                label="City"
              >
                {availableCities.map((city) => (
                  <MenuItem key={city.cityCode} value={city.name}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.city && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                  {errors.city}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            {editMode ? (
              <TextField
                fullWidth
                label="Locality"
                value={formData.locality || ''}
                disabled
                // helperText="Locality cannot be changed in edit mode"
                InputProps={{
                  readOnly: true,
                }}
              />
            ) : (
              <Autocomplete
                freeSolo
                options={availableLocalities.map((loc) => loc.name)}
                value={formData.locality || ''}
                onChange={(event, newValue) => {
                  updateField('locality', newValue || '');
                }}
                onInputChange={(event, newInputValue) => {
                  updateField('locality', newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Locality"
                    placeholder="Select or type locality"
                    helperText="Select from dropdown or type custom locality"
                  />
                )}
              />
            )}
          </Grid>

          {/* Row 3: Project Address */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Project Address"
              value={formData.project_address}
              onChange={(e) => updateField('project_address', e.target.value)}
              placeholder="e.g., Plot No. 123, Al Asayel Street, Near Business Bay Metro Station"
              helperText="Full physical address of the project (optional)"
            />
          </Grid>

          {/* Row 4: Usage Type, Project Type */}
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth required error={Boolean(errors.usage_type)}>
              <InputLabel>Usage Type</InputLabel>
              <Select
                value={formData.usage_type}
                onChange={(e) => updateField('usage_type', e.target.value)}
                label="Usage Type"
              >
                {USAGE_TYPES.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.usage_type && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                  {errors.usage_type}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Project Type</InputLabel>
              <Select
                value={getProjectTypeSelectValue()}
                onChange={(e) => handleProjectTypeChange(e.target.value)}
                label="Project Type"
              >
                <MenuItem value="">Not Specified</MenuItem>
                {PROJECT_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {isCustomProjectType() && (
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Specify Project Type"
                value={customProjectType}
                onChange={(e) => handleCustomProjectTypeChange(e.target.value)}
                placeholder="e.g., Floating Villa"
              />
            </Grid>
          )}

          {/* Row 5: Project Status + Project Code */}
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth required error={Boolean(errors.project_status)}>
              <InputLabel>Project Status</InputLabel>
              <Select
                value={formData.project_status}
                onChange={(e) => updateField('project_status', e.target.value)}
                label="Project Status"
              >
                {PROJECT_STATUS.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.project_status && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                  {errors.project_status}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              label="Project Code"
              value={formData.project_code}
              onChange={(e) => updateField('project_code', e.target.value)}
              placeholder="Auto-generated (e.g., DXB-EM2025001)"
              disabled={editMode}
              helperText={editMode ? "Project code cannot be changed" : "Auto-generated based on city and developer"}
              InputProps={{
                readOnly: !editMode,
              }}
            />
          </Grid>
        </Grid>

        {/* Project Logo */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <FileUpload
              name="project_logo"
              label="Project Logo"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              maxSize={2}
              helperText="Recommended: 180x90px"
              existingFile={getExistingLogo()}
              value={formData.project_logo}
              onChange={(file) => {
                updateFields({
                  project_logo: file,
                  project_logo_preview: URL.createObjectURL(file),
                });
              }}
              onRemove={() => {
                updateFields({
                  project_logo: null,
                  project_logo_preview: '',
                  remove_logo: true,
                });
              }}
              error={errors.project_logo}
              touched={true}
            />
          </Grid>
        </Grid>
      </Card>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackOutlined />}
          onClick={handleCancel}
          sx={{
            borderColor: 'grey.300',
            color: 'text.secondary',
            '&:hover': { borderColor: 'grey.400', bgcolor: 'grey.50' },
          }}
        >
          Cancel
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