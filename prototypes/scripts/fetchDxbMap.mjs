// Fetch the exact Dubai community map data that dxbinteract / investmentmap.ai
// renders, and write it as static GeoJSON for the prototype4 map.
//
// Source endpoints (discovered from the investmentmap.ai bundle):
//   polygons:  https://fam-erp.com/property/xd/map/polygons/loc?location_id=-1
//   metro:     https://fam-erp.com/property/new_project/GetAllMetroStations
//
// Output (static, served as before — no third-party calls at runtime):
//   public/data/dubai_communities.geojson   165 community tiles, exact name+color+stats
//   public/data/dubai_metro.geojson         metro lines (grouped by colour, ordered by seq)
//
// NOTE: this data is FAM Properties' proprietary dataset. Fine for a local
// prototype; clear it for production use. Re-run any time to refresh.
//
//   node scripts/fetchDxbMap.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '../public/data');

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36',
  Accept: 'application/json,*/*',
  Origin: 'https://investmentmap.ai',
  Referer: 'https://investmentmap.ai/',
};

const POLYGONS_URL = 'https://fam-erp.com/property/xd/map/polygons/loc?location_id=-1';
const METRO_URL = 'https://fam-erp.com/property/new_project/GetAllMetroStations';
const LANDMARKS_URL = 'https://investmentmap.ai/data/landmarks.geojson';
const MEDICAL_URL = 'https://fam-erp.com/property/data-genie/medical-centers';
const SCHOOLS_URL = 'https://fam-erp.com/property/new_project/GetAllSchools/All/All';

// "lat, lng" string → [lng, lat]; null if unparseable.
function parseLatLng(str) {
  if (!str) return null;
  const [lat, lng] = String(str).split(',').map((s) => Number(s.trim()));
  return Number.isFinite(lat) && Number.isFinite(lng) ? [lng, lat] : null;
}

// dxbinteract metro line colours → hex used on our map.
const LINE_COLORS = {
  RED: '#EF4444',
  GREEN: '#22C55E',
  BLUE: '#2563EB',
  ORANGE: '#F97316',
  GOLD: '#C9A84C',
  GOLDEN: '#C9A84C',
  PURPLE: '#7E3AED',
};

async function getJson(url) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

function buildCommunities(items) {
  const features = [];
  let skipped = 0;
  for (const it of items) {
    let geometry;
    try {
      geometry = JSON.parse(it.geometry);
    } catch {
      skipped++;
      continue;
    }
    if (!geometry || !geometry.type || !geometry.coordinates) {
      skipped++;
      continue;
    }
    // Keep only the name (a fact) + geometry. None of FAM's stats / colours / ids:
    // tile colours come from our own palette, project numbers from our mock data.
    features.push({
      type: 'Feature',
      properties: { name: it.name, 'name:en': it.name },
      geometry,
    });
  }
  return { fc: { type: 'FeatureCollection', features }, skipped };
}

// Build one LineString per (line_color, branch), stations ordered by seq.
function buildMetro(items) {
  const groups = new Map();
  for (const s of items) {
    if (s.latitude == null || s.longitude == null) continue;
    const key = `${s.line_color}|${s.branch ?? ''}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(s);
  }
  const lineFeatures = [];
  const stationFeatures = [];
  for (const [key, stations] of groups) {
    stations.sort((a, b) => (a.seq ?? 0) - (b.seq ?? 0));
    const [lineColor, branch] = key.split('|');
    const hex = LINE_COLORS[(lineColor || '').toUpperCase()] || '#888888';
    // keep station name + colour only (no line labels / extra fields)
    lineFeatures.push({
      type: 'Feature',
      properties: { color: hex },
      geometry: { type: 'LineString', coordinates: stations.map((s) => [s.longitude, s.latitude]) },
    });
    for (const s of stations) {
      stationFeatures.push({
        type: 'Feature',
        properties: { name: s.metro_name, color: hex },
        geometry: { type: 'Point', coordinates: [s.longitude, s.latitude] },
      });
    }
  }
  return {
    lines: { type: 'FeatureCollection', features: lineFeatures },
    stations: { type: 'FeatureCollection', features: stationFeatures },
    lineCount: lineFeatures.length,
    stationCount: stationFeatures.length,
  };
}

function buildMedical(items) {
  const features = [];
  for (const m of items) {
    const c = parseLatLng(m.cor);
    if (!c) continue;
    // keep name only
    features.push({ type: 'Feature', properties: { name: m.name }, geometry: { type: 'Point', coordinates: c } });
  }
  return { type: 'FeatureCollection', features };
}

function buildSchools(items) {
  const features = [];
  for (const s of items) {
    const lng = Number(s.longitude);
    const lat = Number(s.latitude);
    if (!Number.isFinite(lng) || !Number.isFinite(lat)) continue;
    // keep name only — no rating / curriculum
    features.push({ type: 'Feature', properties: { name: s.school_name }, geometry: { type: 'Point', coordinates: [lng, lat] } });
  }
  return { type: 'FeatureCollection', features };
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log('• fetching community polygons…');
  const poly = await getJson(POLYGONS_URL);
  const { fc, skipped } = buildCommunities(poly.items || []);
  fs.writeFileSync(path.join(OUT_DIR, 'dubai_communities.geojson'), JSON.stringify(fc));
  console.log(`  ${fc.features.length} communities written (skipped ${skipped})`);

  console.log('• fetching metro stations…');
  let metroNote = '';
  try {
    const metro = await getJson(METRO_URL);
    const { lines, stations, lineCount, stationCount } = buildMetro(metro.items || []);
    fs.writeFileSync(path.join(OUT_DIR, 'dubai_metro_lines.geojson'), JSON.stringify(lines));
    fs.writeFileSync(path.join(OUT_DIR, 'dubai_metro_stations.geojson'), JSON.stringify(stations));
    metroNote = `${lineCount} lines / ${stationCount} stations`;
  } catch (e) {
    metroNote = `skipped (${e.message})`;
  }
  console.log(`  metro: ${metroNote}`);

  // landmarks (already GeoJSON — saved as-is, names/titles only; no photo assets)
  console.log('• fetching landmarks…');
  try {
    const lm = await getJson(LANDMARKS_URL);
    fs.writeFileSync(path.join(OUT_DIR, 'dubai_landmarks.geojson'), JSON.stringify(lm));
    console.log(`  ${(lm.features || []).length} landmarks`);
  } catch (e) {
    console.log(`  landmarks skipped (${e.message})`);
  }

  console.log('• fetching medical centers…');
  try {
    const med = await getJson(MEDICAL_URL);
    const fc = buildMedical(med.items || []);
    fs.writeFileSync(path.join(OUT_DIR, 'dubai_medical.geojson'), JSON.stringify(fc));
    console.log(`  ${fc.features.length} medical centers`);
  } catch (e) {
    console.log(`  medical skipped (${e.message})`);
  }

  console.log('• fetching schools…');
  try {
    const sch = await getJson(SCHOOLS_URL);
    const fc = buildSchools(sch.items || []);
    fs.writeFileSync(path.join(OUT_DIR, 'dubai_schools.geojson'), JSON.stringify(fc));
    console.log(`  ${fc.features.length} schools`);
  } catch (e) {
    console.log(`  schools skipped (${e.message})`);
  }

  console.log('\ndone → public/data/dubai_*.geojson');
}

main().catch((e) => {
  console.error('fetch failed:', e.message);
  process.exit(1);
});
