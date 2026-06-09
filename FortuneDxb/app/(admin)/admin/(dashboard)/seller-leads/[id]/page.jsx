'use client';
import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Alert,
  TextField,
  IconButton,
  Stack,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  ArrowBackOutlined,
  ContentCopyOutlined,
  WhatsApp,
  PhoneOutlined,
  EmailOutlined,
  SendOutlined,
  CheckCircleOutline,
  OpenInNewOutlined,
  FileDownloadOutlined,
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { BRAND_COLORS } from '@/lib/theme';

const PROPERTY_TYPE_LABELS = {
  apartment: 'Apartment',
  townhouse: 'Townhouse',
  villa: 'Villa',
  luxury_villa: 'Luxury Villa',
};
const LISTING_TYPE_LABELS = {
  off_plan: 'Off-Plan',
  ready: 'Ready to Move In',
};
const OFFPLAN_STAGE_LABELS = {
  delivering_2yr: 'Delivery 2+ Years',
  nearing_possession: 'Nearing Possession',
  recently_bought: 'Recently Acquired',
};
const OCCUPANCY_LABELS = {
  vacant: 'Vacant',
  preleased: 'Tenanted',
  new_handover: 'Newly Handed Over',
  upcoming_handover: 'Handover Imminent',
};
const INTENT_LABELS = {
  distress: 'Urgent Exit',
  capital_gain: 'Capital Gain',
};

const formatAED = (value) => {
  if (value === null || value === undefined || value === '') return null;
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  return 'AED ' + n.toLocaleString();
};

const formatDateTime = (value) => {
  if (!value) return '—';
  return new Date(value).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function SellerLeadDetailPage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [lead, setLead] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [noteDraft, setNoteDraft] = useState('');
  const [copied, setCopied] = useState('');

  useEffect(() => {
    fetchLead();
  }, [id]);

  const fetchLead = async () => {
    try {
      const res = await fetch(`/api/seller-leads/${id}`);
      const data = await res.json();
      if (data.success) {
        setLead(data.data);
        setTimeline(Array.isArray(data.data.timeline) ? data.data.timeline : []);
      } else {
        setError('Seller lead not found');
      }
    } catch (err) {
      setError('Failed to fetch seller lead');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async () => {
    const text = noteDraft.trim();
    if (!text) return;
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/seller-leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note_text: text }),
      });
      const data = await res.json();
      if (data.success) {
        setTimeline(data.data?.timeline || []);
        setNoteDraft('');
      } else {
        setError(data.message || 'Failed to add note');
      }
    } catch (err) {
      setError('Failed to add note');
    } finally {
      setSaving(false);
    }
  };

  const copyValue = (text, field) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(''), 1800);
  };

  const openWhatsApp = () => {
    if (lead?.phone) {
      const ccode = (lead.phone_ccode || '').replace(/\D/g, '');
      const phone = lead.phone.replace(/\D/g, '');
      window.open(`https://wa.me/${ccode}${phone}`, '_blank');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  if (!lead) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ borderRadius: 1 }}>
          Seller lead not found
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackOutlined />}
          onClick={() => router.push('/admin/seller-leads')}
          sx={{ mt: 2, borderRadius: 1 }}
        >
          Back to Seller Leads
        </Button>
      </Box>
    );
  }

  const phoneDisplay = lead.phone
    ? `${lead.phone_ccode ? lead.phone_ccode + ' ' : ''}${lead.phone}`
    : null;
  const callHref = `tel:${(lead.phone_ccode || '') + (lead.phone || '')}`;

  const original = lead.original_price ? Number(lead.original_price) : null;
  const asking = lead.asking_price ? Number(lead.asking_price) : null;
  const diffPct =
    original && asking ? ((asking - original) / original) * 100 : null;

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, pb: 6 }}>
      {/* ─── Top bar: Back + Ref + Quick actions ─────────── */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Button
          variant="text"
          startIcon={<ArrowBackOutlined />}
          onClick={() => router.push('/admin/seller-leads')}
          sx={{
            color: 'text.secondary',
            borderRadius: 1,
            alignSelf: { xs: 'flex-start', sm: 'center' },
            '&:hover': { bgcolor: 'grey.100' },
          }}
        >
          Back
        </Button>

        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            size="small"
            startIcon={<WhatsApp />}
            onClick={openWhatsApp}
            sx={{
              bgcolor: BRAND_COLORS.whatsapp,
              borderRadius: 1,
              '&:hover': { bgcolor: '#1da851' },
            }}
          >
            WhatsApp
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<PhoneOutlined />}
            href={callHref}
            sx={{
              borderColor: 'divider',
              color: 'text.primary',
              borderRadius: 1,
              '&:hover': { borderColor: 'grey.300', bgcolor: 'background.subtle' },
            }}
          >
            Call
          </Button>
          {lead.email && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<EmailOutlined />}
              href={`mailto:${lead.email}`}
              sx={{
                borderColor: 'divider',
                color: 'text.primary',
                borderRadius: 1,
                '&:hover': { borderColor: 'grey.300', bgcolor: 'background.subtle' },
              }}
            >
              Email
            </Button>
          )}
        </Stack>
      </Stack>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3, borderRadius: 1 }}
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      )}

      {/* ─── Seller Name Header ─────────────────────────── */}
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.3 }}>
          {lead.full_name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Submitted from{' '}
          <Box component="span" sx={{ fontWeight: 500 }}>
            {lead.lead_source || 'seller_page'}
          </Box>
          {lead.nationality && <> · {lead.nationality}</>}
        </Typography>
      </Box>

      {/* ─── 4 stat tiles ────────────────────────────────── */}
      <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
        <StatTile
          label="Asking Price"
          value={formatAED(asking) || '—'}
          accent="text.primary"
        />
        <StatTile
          label="Original Price"
          value={formatAED(original) || '—'}
          accent="text.secondary"
        />
        <StatTile
          label="Differential"
          value={
            diffPct !== null
              ? `${diffPct > 0 ? '+' : ''}${diffPct.toFixed(1)}%`
              : '—'
          }
          accent={
            diffPct === null
              ? 'text.secondary'
              : diffPct > 0
              ? 'success.main'
              : diffPct < 0
              ? 'error.main'
              : 'primary.main'
          }
        />
        <StatTile
          label="Demand Estimate"
          value={lead.demand_estimate || '—'}
          accent="primary.main"
          small
        />
      </Grid>

      {/* ─── 2 col: Seller / Property ────────────────────── */}
      <Grid container spacing={2} sx={{ mb: 2.5 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <InfoCard title="Seller">
            <InfoLine
              label="Phone"
              value={phoneDisplay}
              copyable
              copyKey="phone"
              copied={copied}
              onCopy={copyValue}
            />
            <InfoLine
              label="Email"
              value={lead.email}
              copyable
              copyKey="email"
              copied={copied}
              onCopy={copyValue}
            />
            <InfoLine label="Nationality" value={lead.nationality} />
            <InfoLine label="Objective" value={INTENT_LABELS[lead.sell_intent]} />
          </InfoCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <InfoCard title="Property">
            <InfoLine label="Category" value={PROPERTY_TYPE_LABELS[lead.property_type]} />
            <InfoLine label="Listing" value={LISTING_TYPE_LABELS[lead.listing_type]} />
            {lead.listing_type === 'off_plan' && (
              <InfoLine
                label="Delivery Stage"
                value={OFFPLAN_STAGE_LABELS[lead.offplan_stage]}
              />
            )}
            {lead.listing_type === 'ready' && (
              <InfoLine
                label="Occupancy"
                value={OCCUPANCY_LABELS[lead.ready_occupancy]}
              />
            )}
            <InfoLine label="Location" value={lead.location} />
            <InfoLine
              label="Configuration"
              value={
                lead.bedrooms
                  ? `${lead.bedrooms} BR${lead.bathrooms ? ` · ${lead.bathrooms} Bath` : ''}`
                  : null
              }
            />
            <InfoLine
              label="Area"
              value={
                lead.area_sqft
                  ? `${Number(lead.area_sqft).toLocaleString()} sq. ft.`
                  : null
              }
            />
            <InfoLine label="Floor" value={lead.floor_no} />
          </InfoCard>
        </Grid>
      </Grid>

      {/* ─── Oqood / DLD document ────────────────────────── */}
      {lead.oqood_file_path && (
        <Paper
          elevation={0}
          sx={{
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            p: 2.5,
            mb: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75, minWidth: 0 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 1,
                bgcolor: (theme) => alpha(theme.palette.warning.main, 0.15),
                color: 'warning.dark',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.06em',
              }}
            >
              PDF
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 600,
                  fontSize: '0.68rem',
                  display: 'block',
                  mb: 0.25,
                }}
              >
                Oqood / DLD Document
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.primary',
                  fontWeight: 500,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {lead.oqood_file_name || 'document.pdf'}
              </Typography>
            </Box>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<OpenInNewOutlined sx={{ fontSize: 16 }} />}
              href={`/${lead.oqood_file_path}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                borderRadius: 1,
                borderColor: 'divider',
                color: 'text.primary',
                '&:hover': { borderColor: 'grey.300', bgcolor: 'background.subtle' },
              }}
            >
              View
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={<FileDownloadOutlined sx={{ fontSize: 16 }} />}
              href={`/${lead.oqood_file_path}`}
              download={lead.oqood_file_name || 'oqood.pdf'}
              sx={{
                borderRadius: 1,
                bgcolor: 'navy.main',
                color: 'common.white',
                '&:hover': { bgcolor: 'navy.dark' },
              }}
            >
              Download
            </Button>
          </Stack>
        </Paper>
      )}

      {/* ─── Seller's own note ──────────────────────────── */}
      {lead.notes && (
        <Paper
          elevation={0}
          sx={{
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            p: 2.5,
            mb: 2.5,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 600,
              fontSize: '0.68rem',
              display: 'block',
              mb: 1,
            }}
          >
            Seller's Note
          </Typography>
          <Typography
            variant="body2"
            sx={{ whiteSpace: 'pre-wrap', color: 'grey.700', lineHeight: 1.7 }}
          >
            {lead.notes}
          </Typography>
        </Paper>
      )}

      {/* ─── Activity Timeline ──────────────────────────── */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            px: 2.5,
            py: 1.75,
            bgcolor: 'background.subtle',
            borderBottom: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'text.primary',
            }}
          >
            Activity Timeline
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {timeline.length} {timeline.length === 1 ? 'entry' : 'entries'}
          </Typography>
        </Box>

        <Box sx={{ p: { xs: 2, md: 3 } }}>
          {timeline.length === 0 ? (
            <Typography
              variant="body2"
              sx={{ color: 'text.disabled', fontStyle: 'italic', mb: 2.5 }}
            >
              No activity yet. Add the first follow-up note below.
            </Typography>
          ) : (
            <Box sx={{ position: 'relative', pl: 3.5, mb: 3 }}>
              {/* vertical line */}
              <Box
                sx={{
                  position: 'absolute',
                  left: 7,
                  top: 6,
                  bottom: 6,
                  width: '2px',
                  bgcolor: 'divider',
                }}
              />
              {timeline
                .slice()
                .reverse()
                .map((entry, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      position: 'relative',
                      pb: idx === timeline.length - 1 ? 0 : 2.5,
                    }}
                  >
                    {/* dot */}
                    <Box
                      sx={{
                        position: 'absolute',
                        left: -26,
                        top: 4,
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        bgcolor: 'background.paper',
                        border: '2px solid',
                        borderColor: idx === 0 ? 'primary.main' : 'grey.300',
                        boxShadow:
                          idx === 0
                            ? (theme) =>
                                `0 0 0 3px ${alpha(theme.palette.gold.main, 0.15)}`
                            : 'none',
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.7rem',
                        display: 'block',
                        mb: 0.5,
                        fontWeight: 500,
                      }}
                    >
                      {entry.at ? formatDateTime(entry.at) : 'Earlier'}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        whiteSpace: 'pre-wrap',
                        color: 'grey.700',
                        lineHeight: 1.65,
                      }}
                    >
                      {entry.text}
                    </Typography>
                  </Box>
                ))}
            </Box>
          )}

          <Divider sx={{ my: 2, borderColor: 'divider' }} />

          {/* Add entry */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} alignItems="stretch">
            <TextField
              fullWidth
              multiline
              minRows={2}
              placeholder="Add a follow-up note… e.g. Called, interested in property visit this weekend."
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  handleAddNote();
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'background.subtle',
                  borderRadius: 1,
                  '& fieldset': { borderColor: 'divider' },
                  '&:hover fieldset': { borderColor: 'grey.300' },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleAddNote}
              disabled={saving || !noteDraft.trim()}
              startIcon={saving ? null : <SendOutlined />}
              sx={{
                bgcolor: 'navy.main',
                color: 'common.white',
                borderRadius: 1,
                minWidth: { sm: 140 },
                alignSelf: { sm: 'flex-start' },
                '&:hover': { bgcolor: 'navy.dark' },
              }}
            >
              {saving ? (
                <CircularProgress size={18} sx={{ color: 'common.white' }} />
              ) : (
                'Add Entry'
              )}
            </Button>
          </Stack>
          <Typography
            variant="caption"
            sx={{ color: 'text.disabled', fontSize: '0.68rem', mt: 0.75, display: 'block' }}
          >
            Tip: Cmd/Ctrl + Enter to add quickly.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

/* ─── Sub-components ──────────────────────────────────── */

function StatTile({ label, value, accent, small }) {
  return (
    <Grid size={{ xs: 6, md: 3 }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
          p: 2,
          height: '100%',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontSize: '0.68rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            fontWeight: 600,
            display: 'block',
            mb: 0.75,
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontSize: small ? '0.95rem' : '1.15rem',
            fontWeight: 700,
            color: accent,
            lineHeight: 1.25,
          }}
        >
          {value}
        </Typography>
      </Paper>
    </Grid>
  );
}

function InfoCard({ title, children }) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      <Box
        sx={{
          px: 2.5,
          py: 1.5,
          bgcolor: 'background.subtle',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box sx={{ p: 2.5 }}>{children}</Box>
    </Paper>
  );
}

function InfoLine({ label, value, copyable, copyKey, copied, onCopy }) {
  if (value === null || value === undefined || value === '') return null;
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        py: 1,
        borderBottom: '1px solid',
        borderColor: 'grey.100',
        '&:last-of-type': { borderBottom: 'none' },
      }}
    >
      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
        {label}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, color: 'text.primary', fontSize: '0.85rem', textAlign: 'right' }}
        >
          {value}
        </Typography>
        {copyable && (
          <Tooltip title={copied === copyKey ? 'Copied' : 'Copy'}>
            <IconButton
              size="small"
              onClick={() => onCopy(value, copyKey)}
              sx={{
                color: copied === copyKey ? 'success.main' : 'grey.300',
                '&:hover': { color: 'text.secondary' },
              }}
            >
              {copied === copyKey ? (
                <CheckCircleOutline sx={{ fontSize: 14 }} />
              ) : (
                <ContentCopyOutlined sx={{ fontSize: 14 }} />
              )}
            </IconButton>
          </Tooltip>
        )}
      </Stack>
    </Stack>
  );
}
