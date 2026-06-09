'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Box, CircularProgress, Alert } from '@mui/material';
import ProjectStepper from '@/components/admin/projects/ProjectStepper';
import { ProjectFormProvider } from '@/contexts/ProjectFormContext';

export default function EditProjectLayout({ children }) {
  const params = useParams();
  const projectId = params.id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  // Helper function to parse old configuration format
  const parseOldConfiguration = (config) => {
    // Old format: {type, area, price}
    // New format: {type, is_range, area_min, area_max, area_unit, price_min, price_max, currency}

    const result = {
      type: config.type || '',
      is_range: false,
      units_available: '',
      area_min: '',
      area_max: '',
      area_unit: 'Sq.Ft', // Default from your AREA_UNITS
      price_min: '',
      price_max: '',
      currency: 'AED',
      unit_plan_ids: config.unit_plan_ids || [],
    };

    // Parse area - handle formats like "415 Sq. Ft." or "730-850 Sq. Ft."
    if (config.area) {
      const areaStr = config.area.trim();

      // Extract unit (Sq. Ft. or Sq. M)
      if (areaStr.includes('Sq. M')) {
        result.area_unit = 'Sq.M';
      } else if (areaStr.includes('Sq. Ft') || areaStr.includes('Sq.Ft')) {
        result.area_unit = 'Sq.Ft';
      }

      // Extract numbers - handle range or single value
      const numberMatch = areaStr.match(/(\d+(?:,\d+)?)\s*-?\s*(\d+(?:,\d+)?)?/);
      if (numberMatch) {
        const num1 = numberMatch[1].replace(/,/g, '');
        const num2 = numberMatch[2]?.replace(/,/g, '');

        if (num2) {
          // Range
          result.is_range = true;
          result.area_min = num1;
          result.area_max = num2;
        } else {
          // Single value
          result.area_min = num1;
          result.area_max = num1;
        }
      }
    }

    // Parse price - handle formats like "800,000 AED" or "on request"
    if (config.price && config.price.toLowerCase() !== 'on request') {
      const priceStr = config.price.trim();

      // Extract currency
      if (priceStr.includes('USD')) {
        result.currency = 'USD';
      } else if (priceStr.includes('EUR')) {
        result.currency = 'EUR';
      } else if (priceStr.includes('GBP')) {
        result.currency = 'GBP';
      } else {
        result.currency = 'AED';
      }

      // Extract numbers - handle range or single value
      const numberMatch = priceStr.match(/(\d+(?:,\d+)?)\s*-?\s*(\d+(?:,\d+)?)?/);
      if (numberMatch) {
        const num1 = numberMatch[1].replace(/,/g, '');
        const num2 = numberMatch[2]?.replace(/,/g, '');

        if (num2) {
          // Range
          result.is_range = true;
          result.price_min = num1;
          result.price_max = num2;
        } else {
          // Single value
          result.price_min = num1;
          result.price_max = num1;
        }
      }
    }

    return result;
  };

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/projects/${projectId}`);
      const data = await res.json();
      console.log("project details: ", data);
      if (data.success) {
        const project = data.data;

        // Get all unit plan files
        const unitPlanFiles = project.files?.unitplan || [];

        // Parse configurations - handle both old and new formats
        const configurations = (project.configurations || []).map((config) => {
          // Check if it's old format (has 'area' or 'price' as strings)
          const isOldFormat = typeof config.area === 'string' || typeof config.price === 'string';

          if (isOldFormat) {
            // console.log('Converting old format config:', config);
            return parseOldConfiguration(config);
          } else {
            // New format - just attach unit plans
            const configUnitPlans = unitPlanFiles.filter(f =>
              (config.unit_plan_ids || []).includes(f.file_id)
            );
            return {
              type: config.type || '',
              is_range: config.is_range || false,
              units_available: config.units_available || '',
              area_min: config.area_min || '',
              area_max: config.area_max || '',
              area_unit: config.area_unit || 'Sq.Ft',
              price_min: config.price_min || '',
              price_max: config.price_max || '',
              currency: config.currency || 'AED',
              unit_plan_ids: config.unit_plan_ids || [],
              unit_plan_files: [],
              deleted_unit_plan_ids: [],
              existing_unit_plans: configUnitPlans,
            };
          }
        });

        // Determine state/emirate value
        let stateValue = project.state || '';
        if (!stateValue && project.city) {
          stateValue = project.city;
        }

        // Determine country - normalize old values
        let countryValue = project.country || 'United Arab Emirates';
        if (countryValue === 'UAE') {
          countryValue = 'United Arab Emirates';
        }

        // Transform API data to form data format
        const formattedData = {
          project_id: project.project_id,
          developer_id: project.developer_id,
          project_name: project.project_name,
          sub_headline: project.sub_headline || '',
          project_logo: null,
          project_logo_preview: project.project_logo ? `/${project.project_logo}` : '',

          // Location fields
          country: countryValue,
          state: stateValue,
          city: project.city || '',
          locality: project.locality || '',
          project_address: project.project_address || '',

          project_code: project.project_code || '',
          usage_type: project.usage_type || '',
          project_type: project.project_type || '',
          project_status: project.project_status || '',
          total_towers: project.total_towers || '',
          total_units: project.total_units || '',
          units_sold: project.units_sold ?? '',
          furnishing_status: project.furnishing_status || '',
          // handover_date: fixDateForTimezone(project.handover_date), // FIXED: Timezone issue
          handover_date: project.handover_date
            ? project.handover_date.split('T')[0]
            : '',

          featured: project.featured || false,

          // Location map
          location_iframe: project.location_iframe || '',
          location_link: project.location_link || '',
          video_url: project.video_url || '',

          // FIXED: Configurations with old format support
          configurations: configurations,
          files: project.files,
          booking_amount: project.booking_amount || '',
          payment_plan: project.payment_plan || '',
          roi: project.roi || '',
          about: project.about || '',
          highlights: project.highlights || [],
          faqs: project.faqs || [],
          amenities: project.amenities || [],
          nearby_locations: project.nearby_locations || [],
          email_1: project.email_1 || '',
          email_2: project.email_2 || '',
          phone_1: project.phone_1 || '',
          phone_1_ccode: project.phone_1_ccode || '',
          phone_2: project.phone_2 || '',
          phone_2_ccode: project.phone_2_ccode || '',

          // Gallery
          gallery_images: [],
          existing_gallery: project.files?.gallery || [],

          // Floor plans
          floor_plans: [],
          existing_floor_plans: project.files?.floorplan || [],

          // Brochure
          brochure: null,
          brochure_name: project.files?.brochure?.file_name || '',
          existing_brochure: project.files?.brochure?.file_path || null,

          // New file types
          tax_sheets: [],
          existing_tax_sheets: project.files?.taxsheet || [],
          unit_plans: [],
          existing_unit_plans: project.files?.unitplan || [],
          payment_plans: [],
          existing_payment_plans: project.files?.paymentplan || [],

          // SEO fields
          seo_developer_name: project.seo?.developer_name || '',
          seo_city: project.seo?.city || '',
          meta_title: project.seo?.meta_title || '',
          meta_keywords: project.seo?.meta_keywords || '',
          meta_description: project.seo?.meta_description || '',
          rich_snippets: project.seo?.rich_snippets || '',
        };

        // console.log('Formatted configurations:', formattedData.configurations);
        setProjectData(formattedData);
      } else {
        setError(data.message || 'Project not found');
      }
    } catch (err) {
      console.error('Fetch project error:', err);
      setError('Failed to fetch project');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <ProjectFormProvider editMode={true} projectId={projectId} initialData={projectData}>
      <Box>
        <Box sx={{ p: 0 }}>
          <ProjectStepper />
          {children}
        </Box>
      </Box>
    </ProjectFormProvider>
  );
}