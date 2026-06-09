'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  useMediaQuery,
  useTheme,
  Paper,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { BRAND_COLORS } from '@/lib/theme';
import { Phone } from 'lucide-react';
import {
  getStatusStyle,
  extractIdFromSlug,
  formatPrice,
  getLowestPrice,
  getUnitTypes,
  getAreaRange,
  formatConfigArea,
  formatConfigPrice
} from '@/lib/utils';
import { useProject } from '@/hooks/project/useProjecHook';

// ============ IMPORT COMPONENTS ============
import ProjectImageGallery from '@/components/project/ProjectImageGallery';
import ProjectInfoHeader from '@/components/project/ProjectInfoHeader';
import ProjectAboutContent from '@/components/project/ProjectAboutContent';
import ProjectHighlights from '@/components/project/ProjectHighlights';
import ProjectDocumentsTabs from '@/components/project/ProjectDocumentsTabs';
import ProjectUnitsTable from '@/components/project/ProjectUnitsTable';
import ProjectAmenitiesList from '@/components/project/ProjectAmenitiesList';
import ProjectLocationMap from '@/components/project/ProjectLocationMap';
import ProjectFAQList from '@/components/project/ProjectFAQList';
import ProjectDeveloperCard from '@/components/project/ProjectDeveloperCard';
import ProjectSidebarForm from '@/components/project/ProjectSidebarForm';
import ProjectLeadPopup from '@/components/project/ProjectLeadPopup';
import PlanViewerModal from '@/components/PlanViewerModal/PlanViewerModal';

// ============ COOKIE UTILITIES ============
const COOKIE_NAME = 'fortune_lead';
const COOKIE_EXPIRY_DAYS = 30;

const setCookie = (name, value, days) => {
  if (typeof window === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
};

const getCookie = (name) => {
  if (typeof window === 'undefined') return null;
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(nameEQ)) {
      try {
        return JSON.parse(decodeURIComponent(cookie.substring(nameEQ.length)));
      } catch {
        return null;
      }
    }
  }
  return null;
};

const hasSubmittedLead = (projectId) => {
  const cookie = getCookie(COOKIE_NAME);
  if (!cookie || !cookie.submitted_projects) return false;
  return cookie.submitted_projects.includes(String(projectId));
};

const getSavedUserData = () => {
  const cookie = getCookie(COOKIE_NAME);
  if (!cookie) return null;
  return {
    name: cookie.name || '',
    phone: cookie.phone || '',
    phone_ccode: cookie.phone_ccode || '+971',
    email: cookie.email || ''
  };
};

const saveLeadToCookie = (leadData, projectId) => {
  const existing = getCookie(COOKIE_NAME) || {};
  const submittedProjects = existing.submitted_projects || [];
  if (!submittedProjects.includes(String(projectId))) {
    submittedProjects.push(String(projectId));
  }
  setCookie(COOKIE_NAME, {
    name: leadData.lead_name,
    phone: leadData.lead_phone,
    phone_ccode: leadData.lead_phone_ccode,
    email: leadData.lead_email,
    submitted_projects: submittedProjects,
    updated_at: new Date().toISOString()
  }, COOKIE_EXPIRY_DAYS);
};

// ============ LEAD SOURCES ============
const LEAD_SOURCES = {
  BROCHURE_DOWNLOAD: 'brochure_download',
  VIEW_FLOOR_PLAN: 'view_floor_plan',
  VIEW_UNIT_PLAN: 'view_unit_plan',
  REQUEST_INFORMATION: 'request_information',
  REQUEST_PRICELIST: 'request_pricelist',
  GET_PRICE: 'get_price',
  WHATSAPP_INQUIRY: 'whatsapp_inquiry',
  VIDEO_CALL: 'video_call',
};

const SOURCE_LABELS = {
  [LEAD_SOURCES.BROCHURE_DOWNLOAD]: 'Download Brochure',
  [LEAD_SOURCES.VIEW_FLOOR_PLAN]: 'View Floor Plans',
  [LEAD_SOURCES.VIEW_UNIT_PLAN]: 'View Unit Plans',
  [LEAD_SOURCES.REQUEST_INFORMATION]: 'Request Information',
  [LEAD_SOURCES.REQUEST_PRICELIST]: 'Request Price List',
  [LEAD_SOURCES.GET_PRICE]: 'Get Price',
  [LEAD_SOURCES.WHATSAPP_INQUIRY]: 'WhatsApp Inquiry',
  [LEAD_SOURCES.VIDEO_CALL]: 'Schedule Video Call',
};

// ============ MOBILE CTA ============
// ✅ MobileStickyCTA — dark bg fixed rakha (intentional branding, not theme)
const MobileStickyCTA = ({ phone, onGetPrice, isSubmitted }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  if (!isMobile) return null;

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        p: 2,
        borderRadius: '16px 16px 0 0',
        // ✅ Dark navy — intentional brand CTA, dono modes me same
        bgcolor: 'navy.main',
      }}
    >
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Phone size={18} />}
          href={`tel:${phone || '+971582335969'}`}
          sx={{
            borderColor: 'common.white',
            color: 'common.white',
            py: 1.25,
            fontWeight: 600,
            borderRadius: 1.5,
          }}
        >
          Call Now
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={onGetPrice}
          sx={{
            bgcolor: 'gold.main',
            color: 'navy.main',
            py: 1.25,
            fontWeight: 600,
            borderRadius: 1.5,
          }}
        >
          {isSubmitted ? 'Price Sent ✓' : 'Get Price'}
        </Button>
      </Box>
    </Paper>
  );
};

// ============ PRICE CARD ============
// ✅ PriceCard — dark bg intentional (hero section ke andar hai)
const PriceCard = ({ price, bookingAmount, roi, phone1, onRequestPrice, onWhatsApp, isSubmitted }) => {
  let displayPrice = 'Price on Request';

  if (bookingAmount &&
    bookingAmount !== '0' &&
    bookingAmount !== '' &&
    bookingAmount !== null) {
    displayPrice = formatPrice(bookingAmount);
  } else if (price && price !== 'Price on Request') {
    displayPrice = price;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        border: (theme) => `2px solid ${theme.palette.gold.main}`,
        // ✅ Gold tint — same in both modes (dark hero section ke andar)
        bgcolor: (theme) => alpha(theme.palette.gold.main, 0.08),
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Box>
          <Typography sx={{ fontSize: '0.65rem', color: 'text.disabled', mb: 0.25 }}>
            Starting Price
          </Typography>
          <Typography>
            {displayPrice === 'Price on Request' ? (
              <Box component="span" sx={{ fontSize: '1.35rem', fontWeight: 700, color: 'common.white', lineHeight: 1 }}>
                Price on Request
              </Box>
            ) : (
              <>
                <Box component="span" sx={{ color: 'gold.main', fontSize: '0.75rem' }}>AED </Box>
                <Box component="span" sx={{ fontSize: '1.35rem', fontWeight: 700, color: 'common.white', lineHeight: 1 }}>
                  {displayPrice}
                </Box>
              </>
            )}
          </Typography>
        </Box>
        {roi && (
          <Box sx={{ bgcolor: (theme) => alpha(theme.palette.success.main, 0.15), color: 'success.main', px: 1, py: 0.5, borderRadius: 1, fontSize: '0.75rem', fontWeight: 600 }}>
            ROI: {roi}%
          </Box>
        )}
      </Box>

      <Button
        fullWidth
        variant="contained"
        onClick={onRequestPrice}
        sx={{
          bgcolor: 'gold.main',
          color: 'navy.main',
          py: 0.875,
          fontWeight: 700,
          borderRadius: 1.5,
          mb: 1,
          '&:hover': { bgcolor: 'gold.light' },
        }}
      >
        {isSubmitted ? 'Price List Sent' : 'Request Price List'}
      </Button>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          fullWidth
          variant="outlined"
          size="small"
          startIcon={<Phone size={12} />}
          href={`tel:${phone1 || '+971582335969'}`}
          sx={{ borderColor: (theme) => alpha(theme.palette.common.white, 0.3), color: 'common.white', fontWeight: 600 }}
        >
          Call
        </Button>
        <Button
          fullWidth
          variant="outlined"
          size="small"
          onClick={onWhatsApp}
          sx={{ borderColor: BRAND_COLORS.whatsapp, color: BRAND_COLORS.whatsapp, fontWeight: 600 }}
        >
          WhatsApp
        </Button>
      </Box>
    </Paper>
  );
};

// ============ SKELETON ============
const ProjectDetailsSkeleton = () => (
  // ✅ Skeleton — dark bg (hero section style)
  <Box sx={{ bgcolor: 'navy.main', minHeight: '100vh', pt: 12, pb: 4 }}>
    <Container maxWidth="lg">
      <Typography sx={{ color: 'common.white' }}>Loading...</Typography>
    </Container>
  </Box>
);

// ============ MAIN COMPONENT ============
const ProjectDetails = () => {
  const params = useParams();
  const { city, developer: developerSlug, project: projectSlug } = params;
  const projectId = extractIdFromSlug(projectSlug);
  const theme = useTheme();
  const { project, loading, error, fetchProject } = useProject(projectId);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [leadSource, setLeadSource] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);
  const [isLeadSubmitted, setIsLeadSubmitted] = useState(false);

  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [planModalData, setPlanModalData] = useState({
    plans: [],
    title: '',
    subtitle: '',
    initialIndex: 0,
  });

  useEffect(() => {
    if (projectId) fetchProject(projectId);
  }, [projectId, fetchProject]);

  useEffect(() => {
    if (projectId) setIsLeadSubmitted(hasSubmittedLead(projectId));
  }, [projectId]);

  const openPopup = (source, action = null) => {
    if (hasSubmittedLead(projectId)) {
      if (action) action();
      return;
    }
    setLeadSource(source);
    setPendingAction(() => action);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setLeadSource(null);
    setPendingAction(null);
  };

  const handleLeadSuccess = () => setIsLeadSubmitted(true);

  if (loading) return <ProjectDetailsSkeleton />;

  if (error) return (
    <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2, mt: 10, p: 3 }}>
      <Typography variant="h5" sx={{ color: 'error.main' }}>{error}</Typography>
      <Link href="/" style={{ textDecoration: 'none' }}>
        {/* ✅ Error button — gold bg on dark text, same both modes */}
        <Button variant="contained" sx={{ bgcolor: 'gold.main', color: 'navy.main' }}>
          Back to Home
        </Button>
      </Link>
    </Box>
  );

  if (!project) return (
    <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2, mt: 10, p: 3 }}>
      {/* ✅ 'Project Not Found' — theme text */}
      <Typography variant="h4" sx={{ color: 'text.primary' }}>
        Project Not Found
      </Typography>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <Button variant="contained" sx={{ bgcolor: 'gold.main', color: 'navy.main' }}>
          Back to Home
        </Button>
      </Link>
    </Box>
  );

  // ============ EXTRACT DATA ============
  const projectName = project.project_name;
  const developerName = project.developer_name;
  const developerLogo = project.developer_logo;
  const developerDesc = project.developer_desc;
  const locality = project.locality;
  const projectCity = project.city || 'Dubai';
  const location = locality ? `${locality}, ${projectCity}` : projectCity;
  const locationIframe = project.location_iframe;
  const status = project.project_status || 'Available';
  const amenities = project.amenities || [];
  const highlights = project.highlights || [];
  const configurations = project.configurations || [];
  const about = project.about || `${projectName} is an exclusive residential development by ${developerName}, offering a premium lifestyle in ${location}.`;
  const roi = project.roi;
  const paymentPlan = project.payment_plan || 'Not Mentioned';
  const handoverDate = project.handover_date;
  const videoUrl = project.video_url || project.youtube_link;
  const locationLink = project.location_link;
  const projectType = project.project_type || project.usage_type || 'Residential';
  const totalUnits = project.total_units;
  const furnishingStatus = project.furnishing_status;
  const bookingAmount = project.booking_amount;
  const phone1 = project.phone_1;
  const bedsRange = getUnitTypes(configurations);
  const areaRange = getAreaRange(configurations);
  const lowestPrice = getLowestPrice(configurations);
  const price = lowestPrice ? formatPrice(lowestPrice) : 'Price on Request';

  const galleryImages = project.files?.gallery?.map(f =>
    f.file_path?.startsWith('/') ? f.file_path : `/${f.file_path}`
  ) || [];

  const floorPlans = project.files?.floorplan || [];
  const paymentPlanFiles = project.files?.paymentplan || [];
  const taxSheetFiles = project.files?.taxsheet || [];

  const projectLogo = project.project_logo
    ? (project.project_logo.startsWith('/') ? project.project_logo : `/${project.project_logo}`)
    : null;

  const projectImages = galleryImages.length > 0
    ? galleryImages
    : projectLogo
      ? [projectLogo]
      : ['/asset/placeholderproject.jpg'];

  const brochure = project.files?.brochure;
  const faqs = project.faqs || [];
  const nearbyLocations = project.nearby_locations || [];
  const allUnitPlans = project.files?.unitplan || [];

  const unitPlansMap = {};
  configurations.forEach((config, index) => {
    const planIds = config.unit_plan_ids || [];
    unitPlansMap[index] = allUnitPlans.filter(file => planIds.includes(file.file_id));
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return 'TBA';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const statusStyle = getStatusStyle(status);

  // ============ HANDLERS ============
  const handleWhatsApp = () => {
    const phoneNumber = phone1 || '+971582335969';
    const message = `Hi, I'm interested in ${projectName}`;
    const action = () => window.open(
      `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
    openPopup(LEAD_SOURCES.WHATSAPP_INQUIRY, action);
  };

  const handleBrochureDownload = () => {
    if (brochure) {
      const url = brochure.file_path?.startsWith('/') ? brochure.file_path : `/${brochure.file_path}`;
      const action = () => window.open(url, '_blank');
      openPopup(LEAD_SOURCES.BROCHURE_DOWNLOAD, action);
    }
  };

  const handleRequestPrice = () => openPopup(LEAD_SOURCES.REQUEST_PRICELIST);
  const handleGetPrice = () => openPopup(LEAD_SOURCES.GET_PRICE);
  const handleVideoCall = () => openPopup(LEAD_SOURCES.VIDEO_CALL);

  const handleViewPlan = (index, configType, unitPlans) => {
    if (!unitPlans || unitPlans.length === 0) return;

    const showUnitPlans = () => {
      const formattedPlans = unitPlans.map((plan) => ({
        path: plan.file_path?.startsWith('/') ? plan.file_path : `/${plan.file_path}`,
        isPDF: plan.file_path?.toLowerCase().endsWith('.pdf'),
        name: plan.file_name || 'Unit Plan',
      }));
      setPlanModalData({ plans: formattedPlans, title: configType, subtitle: 'UNIT PLAN', initialIndex: 0 });
      setPlanModalOpen(true);
    };

    if (hasSubmittedLead(projectId)) { showUnitPlans(); return; }
    openPopup(LEAD_SOURCES.VIEW_UNIT_PLAN, showUnitPlans);
  };

  const handleFloorPlanLightbox = (idx) => {
    const formattedPlans = floorPlans.map((plan, i) => ({
      path: plan.file_path?.startsWith('/') ? plan.file_path : `/${plan.file_path}`,
      isPDF: plan.file_path?.toLowerCase().endsWith('.pdf'),
      name: plan.file_name || `Floor Plan ${i + 1}`,
    }));
    setPlanModalData({ plans: formattedPlans, title: projectName, subtitle: 'FLOOR PLANS', initialIndex: idx });
    setPlanModalOpen(true);
  };

  const handlePaymentPlanLightbox = (idx = 0) => {
    if (!paymentPlanFiles || paymentPlanFiles.length === 0) return;
    const formattedPlans = paymentPlanFiles.map((plan) => ({
      path: plan.file_path?.startsWith('/') ? plan.file_path : `/${plan.file_path}`,
      isPDF: plan.file_path?.toLowerCase().endsWith('.pdf'),
      name: plan.file_name || 'Payment Plan',
    }));
    setPlanModalData({ plans: formattedPlans, title: projectName, subtitle: 'PAYMENT PLAN', initialIndex: idx });
    setPlanModalOpen(true);
  };

  const handleTaxSheetLightbox = (idx = 0) => {
    if (!taxSheetFiles || taxSheetFiles.length === 0) return;
    const formattedPlans = taxSheetFiles.map((plan) => ({
      path: plan.file_path?.startsWith('/') ? plan.file_path : `/${plan.file_path}`,
      isPDF: plan.file_path?.toLowerCase().endsWith('.pdf'),
      name: plan.file_name || 'Tax Sheet',
    }));
    setPlanModalData({ plans: formattedPlans, title: projectName, subtitle: 'TAX SHEET', initialIndex: idx });
    setPlanModalOpen(true);
  };

  const handleProjectImageLightbox = (idx) => {
    const formattedPlans = projectImages.map((img, i) => ({
      path: img,
      isPDF: false,
      name: `${projectName} ${i + 1}`,
    }));
    setPlanModalData({ plans: formattedPlans, title: projectName, subtitle: 'GALLERY', initialIndex: idx });
    setPlanModalOpen(true);
  };

  return (
    // ✅ Main wrapper — 'background.default' (light: #FAFAFA, dark: #0F0F1A)
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: { xs: 10, md: 0 } }}>

      <ProjectLeadPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        projectId={projectId}
        projectName={projectName}
        leadSource={leadSource}
        onSuccess={handleLeadSuccess}
        pendingAction={pendingAction}
        getSavedUserData={getSavedUserData}
        saveLeadToCookie={saveLeadToCookie}
        SOURCE_LABELS={SOURCE_LABELS}
        LEAD_SOURCES={LEAD_SOURCES}
      />

      <PlanViewerModal
        isOpen={planModalOpen}
        onClose={() => setPlanModalOpen(false)}
        plans={planModalData.plans}
        title={planModalData.title}
        subtitle={planModalData.subtitle}
        initialIndex={planModalData.initialIndex}
      />

      <MobileStickyCTA phone={phone1} onGetPrice={handleGetPrice} isSubmitted={isLeadSubmitted} />

      {/* ============ HERO SECTION — intentionally dark navy ============ */}
      <Box sx={{ bgcolor: 'navy.main', pt: { xs: 10, md: 12 }, pb: 3, px: 3 }}>
        <Container maxWidth="xl">
          <ProjectImageGallery
            projectImages={projectImages}
            projectName={projectName}
            status={status}
            statusStyle={statusStyle}
            videoUrl={videoUrl}
            onImageClick={handleProjectImageLightbox}
          />

          <Box sx={{ mt: 2.5 }}>
            <ProjectInfoHeader
              projectName={projectName}
              developerName={developerName}
              developerLogo={developerLogo}
              location={location}
              bedsRange={bedsRange}
              status={status}
              areaRange={areaRange}
              handoverDate={handoverDate}
              projectType={projectType}
              formatDate={formatDate}
            />
          </Box>
        </Container>
      </Box>

      {/* ============ MAIN CONTENT — theme-aware ============ */}
      {/* ✅ 'background.paper' — light: white, dark: #1A1A2E */}
      <Box sx={{ px: 3, bgcolor: 'background.paper' }}>
        <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
          <Grid container spacing={{ xs: 3, md: 4, lg: 5 }}>
            <Grid size={{ xs: 12, md: 8 }}>

              <ProjectHighlights
                highlights={highlights}
                bedsRange={bedsRange}
                paymentPlan={paymentPlan}
                roi={roi}
                handoverDate={handoverDate}
                totalUnits={totalUnits}
                furnishingStatus={furnishingStatus}
                formatDate={formatDate}
              />

              {configurations.length > 0 && (
                <ProjectUnitsTable
                  configurations={configurations}
                  unitPlansMap={unitPlansMap}
                  onViewPlan={handleViewPlan}
                  formatConfigArea={formatConfigArea}
                  formatConfigPrice={formatConfigPrice}
                />
              )}

               <ProjectAboutContent
                projectName={projectName}
                about={about}
              />

              <ProjectDocumentsTabs
                floorPlans={floorPlans}
                paymentPlanFiles={paymentPlanFiles}
                taxSheetFiles={taxSheetFiles}
                isLeadSubmitted={isLeadSubmitted}
                onUnlockClick={() => openPopup(LEAD_SOURCES.VIEW_FLOOR_PLAN)}
                onOpenFloorPlan={handleFloorPlanLightbox}
                onOpenPaymentPlan={handlePaymentPlanLightbox}
                onOpenTaxSheet={handleTaxSheetLightbox}
              />

              {amenities.length > 0 && <ProjectAmenitiesList amenities={amenities} />}

              <ProjectLocationMap
                nearbyLocations={nearbyLocations}
                locationLink={locationLink}
                location={location}
                projectName={projectName}
                locationIframe={locationIframe}
              />

              {faqs.length > 0 && <ProjectFAQList faqs={faqs} />}

              <ProjectDeveloperCard
                developerName={developerName}
                developerLogo={developerLogo}
                developerDesc={developerDesc}
                developerSlug={developerSlug}
                developerId={project.developer_id}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <ProjectSidebarForm
                phone1={phone1}
                brochure={brochure}
                onBrochureClick={handleBrochureDownload}
                onWhatsAppClick={handleWhatsApp}
                onVideoCallClick={handleVideoCall}
                isSubmitted={isLeadSubmitted}
                projectId={projectId}
                projectName={projectName}
                onLeadSuccess={handleLeadSuccess}
                getSavedUserData={getSavedUserData}
                saveLeadToCookie={saveLeadToCookie}
                LEAD_SOURCES={LEAD_SOURCES}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default ProjectDetails;