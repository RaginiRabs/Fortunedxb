const mysql = require('mysql2/promise');

const config = {
  old: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fortunedxb_db'
  },
  new: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fortunedxb_db_new'
  }
};

// Capitalize project name
function capitalizeProjectName(str) {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function capitalizeWords(str) {
  if (!str) return '';
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function splitPipe(str) {
  if (!str) return [];
  return str.split('|').map(item => item.trim()).filter(item => item);
}

// Standardize area units to match AREA_UNITS constant
function standardizeAreaUnit(unit) {
  if (!unit) return 'Sq.Ft';
  const lower = unit.toLowerCase().trim();

  // Remove dots and spaces for comparison
  const normalized = lower.replace(/[.\s]/g, '');

  if (normalized === 'sqft' || normalized === 'sqfeet' || normalized === 'squarefeet') {
    return 'Sq.Ft';
  }
  if (normalized === 'sqm' || normalized === 'sqmeter' || normalized === 'squaremeter') {
    return 'Sq.M';
  }

  // Default
  return 'Sq.Ft';
}

// FIXED: Standardize distance units properly
function standardizeDistanceUnit(unit) {
  // if (!unit) return 'Minutes';
  const lower = unit.toLowerCase().trim();

  // Remove dots and spaces for better matching
  const normalized = lower.replace(/[.\s]/g, '');

  // Kilometers - check first to avoid confusion
  if (normalized === 'km' || normalized === 'kms' || normalized === 'kilometer' || normalized === 'kilometers') {
    return 'KM';
  }

  // Minutes
  if (normalized === 'mins' || normalized === 'min' || normalized === 'minutes' || normalized === 'minute') {
    return 'Minutes';
  }

  // Meters
  if (normalized === 'm' || normalized === 'meter' || normalized === 'meters' || normalized === 'mtr') {
    return 'Meters';
  }

  // Default to Minutes
  // return 'Minutes';
}

// FIXED: Price conversion with K, M, Lakh handling
function convertPriceToNumber(priceStr) {
  if (!priceStr || priceStr === '0.00' || priceStr === '') return null;

  const lower = priceStr.toLowerCase().trim();

  // Handle "K" (thousands)
  if (lower.includes('k') && !lower.includes('lakh') && !lower.includes('lac')) {
    const num = parseFloat(priceStr.replace(/[^\d.]/g, ''));
    return Math.round(num * 1000).toString();
  }

  // Handle "Million" or "M"
  if (lower.includes('million') || (lower.includes('m') && !lower.includes('km'))) {
    const num = parseFloat(priceStr.replace(/[^\d.]/g, ''));
    return Math.round(num * 1000000).toString();
  }

  // Handle "Lakh" or "Lac"
  if (lower.includes('lakh') || lower.includes('lac')) {
    const num = parseFloat(priceStr.replace(/[^\d.]/g, ''));
    return Math.round(num * 100000).toString();
  }

  // Pure number - just remove commas
  if (/^\d+$/.test(priceStr.replace(/[,.\s]/g, ''))) {
    return priceStr.replace(/,/g, '').trim();
  }

  // Fallback - remove commas and return
  return priceStr.replace(/,/g, '').trim();
}

function buildConfiguration(types, carpets, prices, startPrice) {
  const typeArr = splitPipe(types);
  const carpetArr = splitPipe(carpets);
  const priceArr = splitPipe(prices);

  return typeArr.map((type, idx) => {
    const carpet = carpetArr[idx] || '';
    const price = priceArr[idx] || startPrice || '';

    // Extract area values and unit
    let areaMin = '';
    let areaMax = '';
    let areaUnit = 'Sq.Ft'; // Default

    if (carpet) {
      // Extract unit first (Sq.Ft, Sq.M, etc.)
      const unitMatch = carpet.match(/sq\.?\s*(?:ft|feet|m|meter)/i);
      if (unitMatch) {
        areaUnit = standardizeAreaUnit(unitMatch[0]);
      }

      // Extract numbers - handle both "450" and "450-650" formats
      const numberMatch = carpet.match(/^([\d,]+)\s*-?\s*([\d,]*)/);
      if (numberMatch) {
        areaMin = numberMatch[1].replace(/,/g, '');
        areaMax = numberMatch[2] ? numberMatch[2].replace(/,/g, '') : areaMin;
      }
    }

    const convertedPrice = convertPriceToNumber(price);

    return {
      type: type.trim(),
      is_range: areaMin !== areaMax && areaMax !== '', // Set is_range based on whether max differs
      units_available: '', // Not available in old data
      area_min: areaMin || null,
      area_max: areaMax || null,
      area_unit: areaUnit,
      price_min: convertedPrice,
      price_max: areaMin !== areaMax && areaMax !== '' ? null : convertedPrice, // Set price_max same as min if not range
      currency: 'AED'
    };
  });
}

function buildAmenities(amenities) {
  return splitPipe(amenities).map(a => capitalizeWords(a));
}

// FIXED: Better connectivity line detection
function isConnectivityLine(line) {
  if (!line) return false;
  
  const lower = line.toLowerCase().trim();
  
  // Pattern 1: "Place - Distance Unit" (Dubai Mall - 10 km)
  const hasDashPattern = /\-\s*\d+\.?\d*[a-z]*\s*(km|kms|minutes?|mins?|m|meter)/i.test(line);
  
  // Pattern 2: "Distance Unit from Place" (10 Minutes from Global Village)
  const hasFromPattern = /^\d+\.?\d*[a-z]*\s*(km|kms|minutes?|mins?|m|meter)\s+from\s+/i.test(line);
  
  return hasDashPattern || hasFromPattern;
}

function extractConnectivity(connectivity, listStr, highlightStr) {
  const allLines = [];

  // Combine all sources
  if (connectivity) allLines.push(...splitPipe(connectivity));
  if (listStr) allLines.push(...splitPipe(listStr));
  if (highlightStr) allLines.push(...splitPipe(highlightStr));

  const result = {
    connectivity: [],
    handover: null,
    paymentPlan: null
  };

  allLines.forEach(line => {
    const lowerLine = line.toLowerCase();

    if (lowerLine.includes('handover') || lowerLine.includes('completion date')) {
      const match = line.match(/(?:Handover|Completion\s*Date)\s*[:\-]\s*(.+)/i);
      if (match) {
        result.handover = match[1].trim();
      }
    } else if (lowerLine.includes('payment plan') || lowerLine.includes('payment')) {
      // Handle various formats:
      // "Payment Plan : 90/10"
      // "Payment plan from 90/10"
      // "60/40 Payment Plan"
      // "Payment Plan:60/40"

      let paymentValue = '';

      // Format 1: "Payment Plan : 90/10"
      const match1 = line.match(/Payment\s*Plan\s*:\s*(.+)/i);
      // Format 2: "Payment plan from 90/10"
      const match2 = line.match(/Payment\s*[Pp]lan\s*from\s*(.+)/i);
      // Format 3: "60/40 Payment Plan"
      const match3 = line.match(/(\d+\/\d+)\s+Payment\s*Plan/i);
      // Format 4: "Payment Plan:60/40"
      const match4 = line.match(/Payment\s*Plan\s*:\s*(\d+\/\d+)/i);

      if (match1) {
        paymentValue = match1[1].trim();
      } else if (match2) {
        paymentValue = match2[1].trim();
      } else if (match3) {
        paymentValue = match3[1].trim();
      } else if (match4) {
        paymentValue = match4[1].trim();
      } else {
        // Try to extract ratio pattern anywhere in the line
        const ratioMatch = line.match(/(\d+\/\d+)/);
        if (ratioMatch) {
          paymentValue = ratioMatch[1].trim();
        }
      }

      // Extract just the plan part (before "onward" or similar)
      if (paymentValue) {
        const planPart = paymentValue.split(/\s+onward/i)[0].trim();
        result.paymentPlan = planPart;
      }
    } else if (isConnectivityLine(line)) {
      result.connectivity.push(line);
    }
  });

  return result;
}

// FIXED: Proper quarter and month parsing
function parseHandoverDate(handoverStr) {
  if (!handoverStr) return null;

  const months = {
    january: '01', jan: '01',
    february: '02', feb: '02',
    march: '03', mar: '03',
    april: '04', apr: '04',
    may: '05',
    june: '06', jun: '06',
    july: '07', jul: '07',
    august: '08', aug: '08',
    september: '09', sep: '09', sept: '09',
    october: '10', oct: '10',
    november: '11', nov: '11',
    december: '12', dec: '12'
  };

  // Q1 = January, Q2 = April, Q3 = July, Q4 = October
  const quarters = {
    'q1': { month: '01', day: '01' }, // January
    'q2': { month: '04', day: '01' }, // April
    'q3': { month: '07', day: '01' }, // July
    'q4': { month: '10', day: '01' }  // October ✅
  };

  // Check for Quarter format: Q1 2025, Q4 2026, etc.
  const quarterMatch = handoverStr.match(/q(\d)\s*(\d{4})/i);
  if (quarterMatch) {
    const quarter = `q${quarterMatch[1]}`;
    const year = quarterMatch[2];
    const quarterData = quarters[quarter.toLowerCase()];
    if (quarterData) {
      return `${year}-${quarterData.month}-${quarterData.day}`;
    }
  }

  // Check for Month-Year format: Jul 2025, July-2025, etc.
  const monthMatch = handoverStr.match(/(\w+)\s*[\-]?\s*(\d{4})/i);
  if (monthMatch) {
    const monthStr = monthMatch[1].toLowerCase();
    const year = monthMatch[2];
    const month = months[monthStr] || '01';
    return `${year}-${month}-01`;
  }

  return null;
}

function mapProjectStatus(oldStatus) {
  if (!oldStatus) return 'New Launch';
  const lower = oldStatus.toLowerCase();

  if (lower.includes('new')) return 'New Launch';
  if (lower.includes('construction') || lower.includes('under')) return 'Under Construction';
  if (lower.includes('completed') || lower.includes('ready')) return 'Ready';

  return 'New Launch';
}

function extractProjectType(totalConfig) {
  if (!totalConfig) return 'Apartment';

  const lower = totalConfig.toLowerCase();
  if (lower.includes('villa')) return 'Villa';
  if (lower.includes('townhouse')) return 'Townhouse';
  if (lower.includes('penthouse')) return 'Penthouse';
  if (lower.includes('apartment')) return 'Apartment';

  return 'Apartment';
}

// NEW: Detect usage type (Residential vs Commercial)
function detectUsageType(totalConfig, type, name) {
  const combinedText = `${totalConfig || ''} ${type || ''} ${name || ''}`.toLowerCase();

  // Check for commercial keywords first
  if (combinedText.includes('office') ||
    combinedText.includes('retail') ||
    combinedText.includes('shop') ||
    combinedText.includes('commercial')) {
    return 'Commercial';
  }

  // Check for residential keywords
  if (combinedText.includes('villa') ||
    combinedText.includes('apartment') ||
    combinedText.includes('residence') ||
    combinedText.includes('townhouse') ||
    combinedText.includes('penthouse')) {
    return 'Residential';
  }

  // Default
  return 'Residential';
}

// FIXED: Remove connectivity lines from highlights
function buildHighlights(listStr, highlightStr, connectivity) {
  const allLines = [];

  if (listStr) allLines.push(...splitPipe(listStr));
  if (highlightStr) allLines.push(...splitPipe(highlightStr));
  if (connectivity) allLines.push(...splitPipe(connectivity));

  const highlights = [];

  allLines.forEach(line => {
    const lowerLine = line.toLowerCase();

    // Skip connectivity lines (Place - Distance Unit pattern)
    if (isConnectivityLine(line)) return;

    // Skip handover/completion date
    if (lowerLine.includes('handover') || lowerLine.includes('completion date')) return;

    // Skip payment plan
    if (lowerLine.includes('payment plan')) return;

    // Add to highlights
    highlights.push(line);
  });

  return highlights;
}

// FIXED: Better nearby location extraction with proper unit detection
function buildNearbyLocations(connectivity, listStr, highlightStr) {
  const allLines = [];

  if (connectivity) allLines.push(...splitPipe(connectivity));
  if (listStr) allLines.push(...splitPipe(listStr));
  if (highlightStr) allLines.push(...splitPipe(highlightStr));

  const locations = [];

  allLines.forEach(place => {
    if (!isConnectivityLine(place)) return;

    let placeName = '';
    let distValue = '';
    let distUnit = '';

    // Pattern 1: "Place - Distance Unit" (Dubai Mall - 10 km)
    const dashMatch = place.match(/^(.+?)\s*-\s*(\d+\.?\d*)[a-z]*\s*(.+?)$/i);

    // Pattern 2: "Distance Unit from Place" (10 Minutes from Global Village)
    const fromMatch = place.match(/^(\d+\.?\d*)[a-z]*\s*(.+?)\s+from\s+(.+)$/i);

    if (dashMatch) {
      placeName = dashMatch[1].trim();
      distValue = dashMatch[2].replace(/[^\d.]/g, ''); // Remove A, B, etc.
      distUnit = dashMatch[3].trim();
    } else if (fromMatch) {
      distValue = fromMatch[1].replace(/[^\d.]/g, '');
      distUnit = fromMatch[2].trim();
      placeName = fromMatch[3].trim();
    } else {
      return; // Skip if no match
    }

    // Standardize unit
    distUnit = standardizeDistanceUnit(distUnit);

    // Detect category
    let category = null;
    const lower = placeName.toLowerCase();

    if (lower.includes('mall') || lower.includes('shopping')) {
      category = 'Shopping';
    } else if (lower.includes('airport') || lower.includes('metro') || lower.includes('expo')) {
      category = 'Transport';
    } else if (lower.includes('park') || lower.includes('garden') || lower.includes('village')) {
      category = 'Recreation';
    } else if (lower.includes('golf') || lower.includes('club')) {
      category = 'Recreation';
    } else if (lower.includes('cinema') || lower.includes('theater')) {
      category = 'Entertainment';
    } else if (lower.includes('downtown') || lower.includes('marina') || lower.includes('beach')) {
      category = 'Landmarks';
    }

    locations.push({
      place_name: placeName,
      distance_value: distValue,
      distance_unit: distUnit,
      category: category
    });
  });

  return locations;
}

function buildFAQs(questions, answers) {
  const qArr = splitPipe(questions);
  const aArr = splitPipe(answers);

  return qArr.map((q, idx) => ({
    question: q.trim(),
    answer: aArr[idx] ? aArr[idx].trim() : ''
  }));
}

// FIXED: Handle both iframe and image paths
function buildLocationData(mapLink) {
  if (!mapLink) return null;

  // Check if it's already an iframe
  if (mapLink.includes('<iframe')) return mapLink;

  // Check if it's an image path
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  const hasImageExtension = imageExtensions.some(ext => mapLink.toLowerCase().includes(ext));

  if (hasImageExtension) {
    // Return image path directly without iframe tag
    return mapLink.trim();
  }

  // It's a URL, wrap in iframe
  return `<iframe src="${mapLink}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
}

function getVideoUrl(videoLink) {
  if (!videoLink) return null;
  return videoLink.trim();
}

// p_overview + p_about me se starting price extract karo
function extractStartingPriceFromText(overview, about) {
  const combinedText = `${overview || ''} ${about || ''}`;
  
  // Match patterns like: "starting price of 85 Lacs", "from 1.25 Cr", "starting at AED 500K"
  const priceMatch = combinedText.match(/(?:starting\s+(?:price\s+)?(?:of|at|from)\s+|from\s+)(?:AED\s+)?([0-9.,]+\s*(?:lacs?|crores?|cr|million|m|k)?)/i);
  
  if (priceMatch) {
    return priceMatch[1].trim();
  }
  
  return null;
}

async function migrateProjects() {
  const oldDb = await mysql.createConnection(config.old);
  const newDb = await mysql.createConnection(config.new);

  try {
    console.log('Fetching all projects from old database...\n');

    const [oldProjects] = await oldDb.query(
      `SELECT * FROM project_details ORDER BY p_id ASC`
    );

    console.log(`Found ${oldProjects.length} projects in old database\n`);

    const [migratedProjects] = await newDb.query(
      `SELECT project_id FROM project_details`
    );
    const migratedIds = new Set(migratedProjects.map(p => p.project_id));

    const missingProjects = oldProjects.filter(p => !migratedIds.has(p.p_id));
    console.log(`Missing projects: ${missingProjects.length}\n`);

    if (missingProjects.length === 0) {
      console.log('All projects already migrated!');
      await oldDb.end();
      await newDb.end();
      return;
    }

    const [developers] = await newDb.query(
      `SELECT developer_id, name FROM developers`
    );

    const developerMap = {};
    developers.forEach(dev => {
      const slug = dev.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      developerMap[slug] = dev.developer_id;
    });

    const projectsToMigrate = missingProjects.slice(0, 25);
    console.log(`Migrating ${projectsToMigrate.length} projects...\n`);

    let successCount = 0;
    let failCount = 0;

    for (const oldProject of projectsToMigrate) {
      try {
        const builderSlug = oldProject.p_builder
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');

        const developerId = developerMap[builderSlug];

        if (!developerId) {
          console.log(`Project ${oldProject.p_id} - ${oldProject.p_name}: Developer '${oldProject.p_builder}' not found`);
          failCount++;
          continue;
        }

        const projectType = extractProjectType(oldProject.p_totalconfig);
        const usageType = detectUsageType(oldProject.p_totalconfig, oldProject.p_type, oldProject.p_name);
        const status = mapProjectStatus(oldProject.p_status);
        const configs = buildConfiguration(oldProject.p_type, oldProject.p_carpet, oldProject.p_price, oldProject.p_startprice);
        const amenities = buildAmenities(oldProject.p_amenities);

        const connData = extractConnectivity(oldProject.p_connectivity, oldProject.p_list, oldProject.p_highlight);
        const highlights = buildHighlights(oldProject.p_list, oldProject.p_highlight, oldProject.p_connectivity);

        const nearbyLocations = buildNearbyLocations(oldProject.p_connectivity, oldProject.p_list, oldProject.p_highlight);
        const handoverDate = parseHandoverDate(connData.handover);
        const faqs = buildFAQs(oldProject.p_question, oldProject.p_answer);
        const locationData = buildLocationData(oldProject.p_map);
        const videoUrl = getVideoUrl(oldProject.p_videoilnks);

        // Add handover and payment plan to highlights
        const finalHighlights = [...highlights];
        if (connData.handover) {
          finalHighlights.push(`Handover : ${connData.handover}`);
        }
        if (connData.paymentPlan) {
          finalHighlights.push(`Payment Plan : ${connData.paymentPlan}`);
        }

        const locality = oldProject.p_location || null;
        const capitalizedName = capitalizeProjectName(oldProject.p_name);

        // Convert start price to booking amount (pure numbers only)
        let startingPrice = oldProject.p_startprice || extractStartingPriceFromText(oldProject.p_overview, oldProject.p_about);
        const bookingAmount = convertPriceToNumber(startingPrice);
        // const bookingAmount = convertPriceToNumber(oldProject.p_startprice);

        // FIXED: All projects are featured
        const featured = 1; // All projects featured by default

        await newDb.query(
          `INSERT INTO project_details (
            project_id, developer_id, project_name, sub_headline, locality, project_address,
            city, state, country, usage_type, project_type, project_status, furnishing_status,
            configurations, amenities, highlights, handover_date, payment_plan, booking_amount,
            location_iframe, video_url, about, email_1, phone_1, phone_1_ccode, featured,
            created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
          [
            oldProject.p_id,
            developerId,
            capitalizedName,
            oldProject.p_subheadline || null,
            locality,
            oldProject.p_sublocation || null,
            'Dubai',
            'Dubai',
            'United Arab Emirates',
            usageType, // Now properly detected
            projectType,
            status,
            'Unfurnished',
            JSON.stringify(configs),
            JSON.stringify(amenities),
            JSON.stringify(finalHighlights),
            handoverDate,
            connData.paymentPlan || null,
            bookingAmount, // Pure numbers only, no units
            locationData, // Can be iframe or image path
            videoUrl,
            (oldProject.p_overview || '') + (oldProject.p_about ? '\n\n' + oldProject.p_about : ''),
            oldProject.p_email || null,
            oldProject.p_contact || null,
            '971',
            featured // All projects featured = 1
          ]
        );

        for (const location of nearbyLocations) {
          await newDb.query(
            `INSERT INTO project_nearby (project_id, place_name, distance_value, distance_unit, category)
             VALUES (?, ?, ?, ?, ?)`,
            [oldProject.p_id, location.place_name, location.distance_value, location.distance_unit, location.category]
          );
        }

        for (const faq of faqs) {
          await newDb.query(
            `INSERT INTO project_faq (project_id, question, answer)
             VALUES (?, ?, ?)`,
            [oldProject.p_id, faq.question, faq.answer]
          );
        }

        const actualDeveloper = developers.find(d => d.developer_id === developerId);
        const seoDevName = actualDeveloper ? actualDeveloper.name : oldProject.p_builder;

        await newDb.query(
          `INSERT INTO project_seo (project_id, developer_name, city, meta_title, meta_keywords, meta_description)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            oldProject.p_id,
            seoDevName,
            'Dubai',
            oldProject.p_mtitle || capitalizedName,
            oldProject.p_mkeyword || '',
            oldProject.p_mdescription || ''
          ]
        );

        console.log(`Project ${oldProject.p_id} - ${capitalizedName}: SUCCESS`);
        successCount++;

      } catch (error) {
        console.log(`Project ${oldProject.p_id} - ${oldProject.p_name}: ERROR - ${error.message}`);
        failCount++;
      }
    }

    console.log(`\n========== MIGRATION SUMMARY ==========`);
    console.log(`Success: ${successCount}`);
    console.log(`Failed: ${failCount}`);
    console.log(`Total Processed: ${successCount + failCount}`);
    console.log(`=======================================\n`);

  } catch (error) {
    console.error('Fatal Error:', error.message);
  } finally {
    await oldDb.end();
    await newDb.end();
  }
}

migrateProjects();