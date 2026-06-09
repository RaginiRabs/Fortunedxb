'use client';
import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Chip,
  TextField,
  IconButton,
} from '@mui/material';
import {
  ArrowBackOutlined,
  SaveOutlined,
  ContentCopyOutlined,
  WhatsApp,
  PhoneOutlined,
  EmailOutlined,
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { BRAND_COLORS } from '@/lib/theme';

export default function LeadDetailPage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [comments, setComments] = useState('');
  const [copied, setCopied] = useState('');

  useEffect(() => {
    fetchLead();
  }, [id]);

  const fetchLead = async () => {
    try {
      const res = await fetch(`/api/leads/${id}`);
      const data = await res.json();

      if (data.success) {
        setLead(data.data);
        setComments(data.data.comments || '');
      } else {
        setError('Lead not found');
      }
    } catch (err) {
      setError('Failed to fetch lead');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveComments = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comments }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess('Notes saved successfully');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to save notes');
    } finally {
      setSaving(false);
    }
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(''), 2000);
  };

  const openWhatsApp = () => {
    if (lead?.lead_phone) {
      const phone = lead.lead_phone.replace(/\D/g, '');
      window.open(`https://wa.me/${phone}`, '_blank');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  if (!lead) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Lead not found</Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackOutlined />}
          onClick={() => router.push('/admin/leads')}
          sx={{ mt: 2 }}
        >
          Back to Leads
        </Button>
      </Box>
    );
  }

  // Info row component
  const InfoRow = ({ label, value, copyable, field }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: '1px solid', borderColor: 'grey.100' }}>
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 100 }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography sx={{ fontWeight: 500 }}>{value || '-'}</Typography>
        {copyable && value && (
          <IconButton
            size="small"
            onClick={() => copyToClipboard(value, field)}
            sx={{ 
              color: copied === field ? 'success.main' : 'grey.400',
              '&:hover': { color: 'grey.600' }
            }}
          >
            <ContentCopyOutlined sx={{ fontSize: 14 }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Left - Lead Info */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
            {/* Header */}
            <Box sx={{ p: 3, bgcolor: 'background.subtle', borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                {lead.lead_name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Chip 
                  label={lead.lead_source || 'Direct'} 
                  size="small" 
                  sx={{ bgcolor: 'navy.main', color: 'common.white', fontSize: '0.75rem' }}
                />
                <Typography variant="body2" color="text.secondary">
                  {lead.lead_date ? new Date(lead.lead_date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : '-'}
                </Typography>
              </Box>
            </Box>

            {/* Contact Details */}
            <Box sx={{ p: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: 1 }}>
                Contact Details
              </Typography>
              
              <InfoRow label="Phone" value={lead.lead_phone} copyable field="phone" />
              <InfoRow label="Email" value={lead.lead_email} copyable field="email" />
              <InfoRow label="Project" value={lead.project_name} />
              
              {/* Message */}
              {lead.lead_message && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: 1 }}>
                    Message
                  </Typography>
                  <Box sx={{ p: 2, bgcolor: 'background.subtle', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', color: 'grey.700' }}>
                      {lead.lead_message}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Card>
        </Grid>

        {/* Right - Actions & Notes */}
        <Grid size={{ xs: 12, md: 4 }}>
          {/* Quick Actions */}
          <Card elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider', mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 2, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: 1 }}>
              Quick Actions
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<WhatsApp />}
                onClick={openWhatsApp}
                sx={{
                  bgcolor: BRAND_COLORS.whatsapp,
                  color: 'common.white',
                  '&:hover': { bgcolor: alpha(BRAND_COLORS.whatsapp, 0.85) },
                }}
              >
                WhatsApp
              </Button>
              
              <Button
                fullWidth
                variant="outlined"
                startIcon={<PhoneOutlined />}
                href={`tel:${lead.lead_phone}`}
                sx={{
                  borderColor: 'divider',
                  color: 'text.primary',
                  '&:hover': { borderColor: 'grey.300', bgcolor: 'background.subtle' },
                }}
              >
                Call
              </Button>
            </Box>

            {lead.lead_email && (
              <Button
                fullWidth
                variant="outlined"
                startIcon={<EmailOutlined />}
                href={`mailto:${lead.lead_email}`}
                sx={{
                  mt: 1,
                  borderColor: 'divider',
                  color: 'text.primary',
                  '&:hover': { borderColor: 'grey.300', bgcolor: 'background.subtle' },
                }}
              >
                Send Email
              </Button>
            )}
          </Card>

          {/* Internal Notes */}
          <Card elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 2, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: 1 }}>
              Internal Notes
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={5}
              placeholder="Add notes about this lead..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'background.subtle',
                  '& fieldset': { borderColor: 'divider' },
                  '&:hover fieldset': { borderColor: 'grey.300' },
                }
              }}
            />

            <Button
              fullWidth
              variant="contained"
              startIcon={saving ? null : <SaveOutlined />}
              onClick={handleSaveComments}
              disabled={saving}
              sx={{
                bgcolor: 'navy.main',
                color: (theme) => alpha(theme.palette.common.white, 0.62),
                '&:hover': { bgcolor: 'navy.dark' },
              }}
            >
              {saving ? <CircularProgress size={20} sx={{ color: 'common.white' }} /> : 'Save Notes'}
            </Button>
          </Card>
        </Grid>
      </Grid>

      {/* Back Button */}
      <Box sx={{ mt: 3 }}>
        <Button
          variant="text"
          startIcon={<ArrowBackOutlined />}
          onClick={() => router.push('/admin/leads')}
          sx={{ color: 'text.secondary', '&:hover': { bgcolor: 'grey.100' } }}
        >
          Back to Leads
        </Button>
      </Box>
    </Box>
  );
}