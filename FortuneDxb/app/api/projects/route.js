import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { saveSingleFile, validateFile } from '@/lib/fileUpload';
import { generateProjectCode } from '@/lib/generateProjectCode';
import { withRestart } from '@/lib/apiHandler';

// GET - List all projects with filters + GALLERY IMAGES
async function getHandler(request) {
  const { searchParams } = new URL(request.url);

  // Get all filter params
  const search = searchParams.get('search');
  const status = searchParams.get('status');
  const usage = searchParams.get('usage');
  const unit = searchParams.get('unit');
  const developer = searchParams.get('developer');
  const locality = searchParams.get('locality');
  const completion = searchParams.get('completion');
  const payment = searchParams.get('payment');
  const price_min = searchParams.get('price_min');
  const price_max = searchParams.get('price_max');
  const highlights = searchParams.get('highlights');
  const distress = searchParams.get('distress');

  // Pagination and sorting params
  const limit = parseInt(searchParams.get('limit')) || 1000;
  const offset = parseInt(searchParams.get('offset')) || 0;
  let sort_by = searchParams.get('sort_by') || 'project_id';
  let sort_order = (searchParams.get('sort_order') || 'DESC').toUpperCase();
  if (!['ASC', 'DESC'].includes(sort_order)) {
    sort_order = 'DESC';
  }

  // Sort field mapping
  const sortMap = {
    project_id: 'p.project_id',
    project_name: 'p.project_name',
    developer_name: 'd.name',
    project_status: 'p.project_status',
    price_min: 'p.price_min',
    usage_type: 'p.usage_type',
    featured: 'p.featured',
  };
  const sortField = sortMap[sort_by] || 'p.project_id';

  let sql = `
    SELECT 
      p.*,
      d.name as developer_name
    FROM project_details p
    LEFT JOIN developers d ON p.developer_id = d.developer_id
    WHERE 1=1
  `;

  const params = [];

  // Search filter (project name, locality, developer name)
  if (search) {
    sql += ` AND (
      p.project_name LIKE ? OR 
      p.locality LIKE ? OR 
      p.city LIKE ? OR
      d.name LIKE ?
    )`;
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm, searchTerm);
  }

  // Distress deal filter (1 = only distress, 0 = exclude distress, none = all)
  if (distress === '1') {
    sql += ' AND p.is_distress_deal = 1';
  } else if (distress === '0') {
    sql += ' AND p.is_distress_deal = 0';
  }

  // Status filter
  if (status) {
    sql += ' AND p.project_status = ?';
    params.push(status);
  }

  // Usage type filter
  if (usage) {
    sql += ' AND p.usage_type = ?';
    params.push(usage);
  }

  // Unit type filter
  if (unit) {
    sql += ` AND JSON_SEARCH(p.configurations, 'one', ?, NULL, '$[*].type') IS NOT NULL`;
    params.push(unit);
  }

  // Developer filter
  if (developer) {
    sql += ' AND p.developer_id = ?';
    params.push(developer);
  }

  // Locality filter
  if (locality) {
    sql += ' AND p.locality = ?';
    params.push(locality);
  }

  // Completion year filter
  if (completion) {
    if (completion === '2028') {
      sql += ' AND YEAR(p.handover_date) >= ?';
      params.push(2028);
    } else {
      sql += ' AND YEAR(p.handover_date) = ?';
      params.push(parseInt(completion));
    }
  }

  // Payment plan filter
  if (payment) {
    sql += ' AND p.payment_plan = ?';
    params.push(payment);
  }

  // Price range filter
  if (price_min) {
    sql += ` AND (
      JSON_EXTRACT(p.configurations, '$[0].price_min') >= ? OR
      JSON_EXTRACT(p.configurations, '$[0].price_max') >= ?
    )`;
    params.push(parseInt(price_min), parseInt(price_min));
  }

  if (price_max) {
    sql += ` AND (
      JSON_EXTRACT(p.configurations, '$[0].price_min') <= ? OR
      JSON_EXTRACT(p.configurations, '$[0].price_min') IS NULL
    )`;
    params.push(parseInt(price_max));
  }

  // Highlights filter
  if (highlights) {
    const highlightArray = highlights.split(',');
    const highlightConditions = highlightArray.map(() =>
      `JSON_SEARCH(p.highlights, 'one', ?) IS NOT NULL`
    ).join(' OR ');
    sql += ` AND (${highlightConditions})`;
    highlightArray.forEach(h => params.push(h.trim()));
  }

  // Get total count first
  const countSql = sql.replace(/SELECT[\s\S]*?FROM/, 'SELECT COUNT(*) as total FROM');
  const countRows = await query(countSql, params);
  const totalCount = Number(countRows?.[0]?.total || 0);

  // Add order and limit to main query
  sql += ` ORDER BY ${sortField} ${sort_order}`;
  sql += ' LIMIT ? OFFSET ?';
  params.push(limit, offset);

  const projects = await query(sql, params);

  // Parse JSON fields + Fetch gallery images for each project
  const parsedProjects = await Promise.all(projects.map(async (p) => {
    // Parse JSON fields
    const parsed = {
      ...p,
      configurations: p.configurations ? JSON.parse(p.configurations) : [],
      highlights: p.highlights ? JSON.parse(p.highlights) : [],
      amenities: p.amenities ? JSON.parse(p.amenities) : [],
    };

    // Fetch gallery images for this project
    const galleryFiles = await query(
      `SELECT file_id, file_name, file_path, file_type 
       FROM project_files 
       WHERE project_id = ? AND file_type = 'gallery'
       ORDER BY file_id ASC`,
      [p.project_id]
    );

    parsed.gallery = galleryFiles;

    return parsed;
  }));

  return NextResponse.json({
    success: true,
    data: parsedProjects,
    total: totalCount,
    filters_applied: {
      search, status, usage, unit, developer, locality,
      completion, payment, price_min, price_max, highlights
    }
  });
}

// POST - Create new project
async function postHandler(request) {
  const formData = await request.formData();
  const dataStr = formData.get('data');
  const data = JSON.parse(dataStr);

  const {
    manual_project_id,
    developer_id,
    project_name,
    sub_headline,
    city,
    country,
    state,
    locality,
    project_address,
    project_code,
    usage_type,
    project_type,
    project_status,
    total_towers,
    total_units,
    units_sold,
    furnishing_status,
    handover_date,
    featured,
    is_distress_deal,
    location_iframe,
    location_link,
    video_url,
    configurations,
    booking_amount,
    payment_plan,
    roi,
    about,
    highlights,
    faqs,
    amenities,
    nearby_locations,
    email_1,
    email_2,
    phone_1,
    phone_1_ccode,
    phone_2,
    phone_2_ccode,
    seo_developer_name,
    seo_city,
    meta_title,
    meta_keywords,
    meta_description,
    rich_snippets,
  } = data;

  // Validation
  if (!developer_id || !project_name || !usage_type || !project_status || !city) {
    return NextResponse.json(
      { success: false, message: 'Required fields missing' },
      { status: 400 }
    );
  }

  // Validate manual_project_id if provided
  if (manual_project_id) {
    const parsedId = parseInt(manual_project_id);
    if (isNaN(parsedId) || parsedId <= 0) {
      return NextResponse.json(
        { success: false, message: 'Project ID must be a positive number' },
        { status: 400 }
      );
    }

    const existingProject = await queryOne(
      'SELECT project_id FROM project_details WHERE project_id = ?',
      [parsedId]
    );

    if (existingProject) {
      return NextResponse.json(
        { success: false, message: `Project ID ${parsedId} already exists. Please use a different ID.` },
        { status: 400 }
      );
    }
  }

  // Get developer name
  const developer = await queryOne(
    'SELECT name FROM developers WHERE developer_id = ?',
    [developer_id]
  );

  if (!developer) {
    return NextResponse.json(
      { success: false, message: 'Invalid developer' },
      { status: 400 }
    );
  }

  // SEO Verification
  if (seo_city && seo_city !== city) {
    return NextResponse.json(
      { success: false, message: 'SEO city must match project city' },
      { status: 400 }
    );
  }

  if (seo_developer_name && seo_developer_name !== developer.name) {
    return NextResponse.json(
      { success: false, message: 'SEO developer name must match selected developer' },
      { status: 400 }
    );
  }

  // Generate project code if not provided
  let finalProjectCode = project_code;
  if (!finalProjectCode) {
    const year = new Date().getFullYear();
    const sequenceResult = await queryOne(
      `SELECT COUNT(*) as count FROM project_details 
       WHERE YEAR(created_at) = ? AND city = ?`,
      [year, city]
    );
    const sequence = (sequenceResult?.count || 0) + 1;
    finalProjectCode = generateProjectCode(city, developer.name, sequence, year);
  }

  // Prepare configurations for DB
  let configurationsForDb = (configurations || []).map(config => ({
    type: config.type,
    is_range: config.is_range,
    units_available: config.units_available,
    area_min: config.area_min,
    area_max: config.area_max,
    area_unit: config.area_unit,
    price_min: config.price_min,
    price_max: config.price_max,
    currency: config.currency,
    unit_plan_ids: [],
  }));

  let projectId;

  // Insert project - with or without manual project_id
  if (manual_project_id) {
    const parsedId = parseInt(manual_project_id);

    await query(
      `INSERT INTO project_details (
        project_id, developer_id, project_name, sub_headline, city, country, state, locality,
        project_address, project_code, usage_type, project_type, project_status,
        total_towers, total_units, units_sold, furnishing_status, handover_date,
        featured, is_distress_deal, location_iframe, location_link, video_url, configurations, booking_amount,
        payment_plan, roi, about, highlights, amenities,
        email_1, email_2, phone_1, phone_1_ccode, phone_2, phone_2_ccode
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        parsedId,
        developer_id,
        project_name,
        sub_headline || null,
        city,
        country || 'UAE',
        state || null,
        locality || null,
        project_address || null,
        finalProjectCode,
        usage_type,
        project_type || null,
        project_status,
        total_towers || null,
        total_units || null,
        units_sold || null,
        furnishing_status || null,
        handover_date || null,
        featured || false,
        is_distress_deal || false,
        location_iframe || null,
        location_link || null,
        video_url || null,
        JSON.stringify(configurationsForDb),
        booking_amount || null,
        payment_plan || null,
        roi || null,
        about || null,
        highlights ? JSON.stringify(highlights) : null,
        amenities ? JSON.stringify(amenities) : null,
        email_1 || null,
        email_2 || null,
        phone_1 || null,
        phone_1_ccode || null,
        phone_2 || null,
        phone_2_ccode || null,
      ]
    );

    projectId = parsedId;
  } else {
    const result = await query(
      `INSERT INTO project_details (
        developer_id, project_name, sub_headline, city, country, state, locality,
        project_address, project_code, usage_type, project_type, project_status,
        total_towers, total_units, units_sold, furnishing_status, handover_date,
        featured, is_distress_deal, location_iframe, location_link, video_url, configurations, booking_amount,
        payment_plan, roi, about, highlights, amenities,
        email_1, email_2, phone_1, phone_1_ccode, phone_2, phone_2_ccode
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        developer_id,
        project_name,
        sub_headline || null,
        city,
        country || 'UAE',
        state || null,
        locality || null,
        project_address || null,
        finalProjectCode,
        usage_type,
        project_type || null,
        project_status,
        total_towers || null,
        total_units || null,
        units_sold || null,
        furnishing_status || null,
        handover_date || null,
        featured || false,
        is_distress_deal || false,
        location_iframe || null,
        location_link || null,
        video_url || null,
        JSON.stringify(configurationsForDb),
        booking_amount || null,
        payment_plan || null,
        roi || null,
        about || null,
        highlights ? JSON.stringify(highlights) : null,
        amenities ? JSON.stringify(amenities) : null,
        email_1 || null,
        email_2 || null,
        phone_1 || null,
        phone_1_ccode || null,
        phone_2 || null,
        phone_2_ccode || null,
      ]
    );

    projectId = result.insertId;
  }

  // ============================================
  // FILE UPLOADS HANDLING
  // ============================================

  // Handle project logo
  const projectLogo = formData.get('project_logo');
  if (projectLogo && projectLogo instanceof File && projectLogo.size > 0) {
    const validation = validateFile(projectLogo, 'projectlogo');
    if (validation.valid) {
      const logoPath = await saveSingleFile(projectLogo, 'projectlogo', projectId);
      await query('UPDATE project_details SET project_logo = ? WHERE project_id = ?', [logoPath, projectId]);
    }
  }

  // Handle gallery images
  const galleryCount = parseInt(formData.get('gallery_count') || '0');
  for (let i = 0; i < galleryCount; i++) {
    const file = formData.get(`gallery_${i}`);
    if (file && file instanceof File && file.size > 0) {
      const validation = validateFile(file, 'gallery');
      if (validation.valid) {
        const filePath = await saveSingleFile(file, 'gallery', projectId);
        await query(
          'INSERT INTO project_files (project_id, file_name, file_type, file_path) VALUES (?, ?, ?, ?)',
          [projectId, file.name, 'gallery', filePath]
        );
      }
    }
  }

  // Handle floor plans
  const floorplanCount = parseInt(formData.get('floorplan_count') || '0');
  for (let i = 0; i < floorplanCount; i++) {
    const file = formData.get(`floorplan_${i}`);
    if (file && file instanceof File && file.size > 0) {
      const validation = validateFile(file, 'floorplan');
      if (validation.valid) {
        const filePath = await saveSingleFile(file, 'floorplan', projectId);
        await query(
          'INSERT INTO project_files (project_id, file_name, file_type, file_path) VALUES (?, ?, ?, ?)',
          [projectId, file.name, 'floorplan', filePath]
        );
      }
    }
  }

  // Handle brochure
  const brochure = formData.get('brochure');
  if (brochure && brochure instanceof File && brochure.size > 0) {
    const validation = validateFile(brochure, 'brochure');
    if (validation.valid) {
      const filePath = await saveSingleFile(brochure, 'brochure', projectId);
      await query(
        'INSERT INTO project_files (project_id, file_name, file_type, file_path) VALUES (?, ?, ?, ?)',
        [projectId, brochure.name, 'brochure', filePath]
      );
    }
  }

  // Handle tax sheets
  const taxsheetCount = parseInt(formData.get('taxsheet_count') || '0');
  for (let i = 0; i < taxsheetCount; i++) {
    const file = formData.get(`taxsheet_${i}`);
    if (file && file instanceof File && file.size > 0) {
      const validation = validateFile(file, 'taxsheet');
      if (validation.valid) {
        const filePath = await saveSingleFile(file, 'taxsheet', projectId);
        await query(
          'INSERT INTO project_files (project_id, file_name, file_type, file_path) VALUES (?, ?, ?, ?)',
          [projectId, file.name, 'taxsheet', filePath]
        );
      }
    }
  }

  // Handle payment plans
  const paymentplanCount = parseInt(formData.get('paymentplan_count') || '0');
  for (let i = 0; i < paymentplanCount; i++) {
    const file = formData.get(`paymentplan_${i}`);
    if (file && file instanceof File && file.size > 0) {
      const validation = validateFile(file, 'paymentplan');
      if (validation.valid) {
        const filePath = await saveSingleFile(file, 'paymentplan', projectId);
        await query(
          'INSERT INTO project_files (project_id, file_name, file_type, file_path) VALUES (?, ?, ?, ?)',
          [projectId, file.name, 'paymentplan', filePath]
        );
      }
    }
  }

  // Handle config-wise unit plans
  const configUnitPlanMetaStr = formData.get('config_unitplan_meta');
  const configUnitPlanMeta = configUnitPlanMetaStr ? JSON.parse(configUnitPlanMetaStr) : [];

  let configurationsUpdated = false;

  for (const meta of configUnitPlanMeta) {
    const { configIndex, fileIndex } = meta;
    const file = formData.get(`config_unitplan_${configIndex}_${fileIndex}`);

    if (file && file instanceof File && file.size > 0) {
      const validation = validateFile(file, 'unitplan');
      if (validation.valid) {
        const filePath = await saveSingleFile(file, 'unitplan', projectId);
        const fileResult = await query(
          'INSERT INTO project_files (project_id, file_name, file_type, file_path) VALUES (?, ?, ?, ?)',
          [projectId, file.name, 'unitplan', filePath]
        );

        const fileId = fileResult.insertId;

        if (configurationsForDb[configIndex]) {
          if (!configurationsForDb[configIndex].unit_plan_ids) {
            configurationsForDb[configIndex].unit_plan_ids = [];
          }
          configurationsForDb[configIndex].unit_plan_ids.push(fileId);
          configurationsUpdated = true;
        }
      }
    }
  }

  // Update configurations in DB if unit plans were added
  if (configurationsUpdated) {
    await query(
      'UPDATE project_details SET configurations = ? WHERE project_id = ?',
      [JSON.stringify(configurationsForDb), projectId]
    );
  }

  // ============================================
  // RELATED DATA INSERTION
  // ============================================

  // Insert nearby locations
  if (nearby_locations && nearby_locations.length > 0) {
    for (const location of nearby_locations) {
      if (location.place_name) {
        await query(
          `INSERT INTO project_nearby (project_id, place_name, distance_value, distance_unit, category, place_link)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            projectId,
            location.place_name,
            location.distance_value || null,
            location.distance_unit || null,
            location.category || null,
            location.place_link || null
          ]
        );
      }
    }
  }

  // Insert FAQs
  if (faqs && faqs.length > 0) {
    for (const faq of faqs) {
      if (faq.question && faq.answer) {
        await query(
          'INSERT INTO project_faq (project_id, question, answer) VALUES (?, ?, ?)',
          [projectId, faq.question, faq.answer]
        );
      }
    }
  }

  // Insert SEO data
  await query(
    `INSERT INTO project_seo (project_id, developer_name, city, meta_title, meta_keywords, meta_description, rich_snippets)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      projectId,
      seo_developer_name || developer.name,
      seo_city || city,
      meta_title || null,
      meta_keywords || null,
      meta_description || null,
      rich_snippets || null,
    ]
  );

  return NextResponse.json({
    success: true,
    message: 'Project created successfully',
    data: { project_id: projectId, project_code: finalProjectCode },
  });
}

// Export with restart wrapper
export const GET = withRestart(getHandler);
export const POST = withRestart(postHandler);