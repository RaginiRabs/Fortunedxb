'use client';

// Dubai interactive map (DXB-Interact replica) on MapLibre GL + OpenFreeMap tiles.
// Community tiles (exact dxbinteract names + colours) always visible with permanent
// name labels; hover darkens a tile. Metro (default on), Landmarks and Project
// Numbers toggle via the "Show" dropdown. All map data is fetched static GeoJSON
// produced by scripts/fetchDxbMap.mjs. Tailwind-only, English labels (name:en).
import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { ChevronDown } from 'lucide-react';

const STYLE = 'https://tiles.openfreemap.org/styles/positron';

// Hide basemap clutter (roads, POIs, basemap labels, buildings) so only the
// white land + blue water + community polygons remain — DXB Interact look.
const BASEMAP_CLUTTER = /(road|highway|tunnel|bridge|rail|transit|aeroway|airport|poi|place|housenum|label|building|boundary|ferry|oneway)/i;
const COMMUNITIES_URL = '/data/dubai_communities.geojson';
const METRO_LINES_URL = '/data/dubai_metro_lines.geojson';
const METRO_STATIONS_URL = '/data/dubai_metro_stations.geojson';
const LANDMARKS_URL = '/data/dubai_landmarks.geojson';
const MEDICAL_URL = '/data/dubai_medical.geojson';
const SCHOOLS_URL = '/data/dubai_schools.geojson';

const BRAND = { espresso: '#3C1F0F', bronze: '#A0622A', gold: '#C9A84C', ivory: '#FAF6F0' };
// Glyph fonts served by the OpenFreeMap style (Jost is not available as map glyphs).
const MAP_FONT = ['Noto Sans Regular'];
const MAP_FONT_BOLD = ['Noto Sans Bold'];

// dxbinteract tile colours come straight from the data ('color'); we only
// derive a slightly darker shade of each tile for its hover state.
function darken(hex, amount = 0.16) {
  const h = (hex || '#cccccc').replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  const r = Math.max(0, Math.round(((n >> 16) & 255) * (1 - amount)));
  const g = Math.max(0, Math.round(((n >> 8) & 255) * (1 - amount)));
  const b = Math.max(0, Math.round((n & 255) * (1 - amount)));
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
}

// Our own tile palette (replaces the source colours) — brighter accent colours
// alternated with neutrals, picked deterministically per community name.
const TILE_PALETTE = [
  '#E89B7B', // coral
  '#CFC3A8', // sand (neutral)
  '#5FAFA0', // teal
  '#BFB8AC', // warm grey (neutral)
  '#6E9CE0', // blue
  '#D9CBB2', // beige (neutral)
  '#E6B53F', // amber
  '#B6B0A4', // stone (neutral)
  '#7CC06A', // green
  '#C9BCA7', // taupe (neutral)
  '#C98ACF', // orchid
  '#AEB4B8', // cool grey (neutral)
  '#EE8FA9', // pink
  '#C4BFB4', // greige (neutral)
  '#F0944A', // orange
  '#B9C0B2', // sage grey (neutral)
];
function tileColor(name = '') {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return TILE_PALETTE[Math.abs(h) % TILE_PALETTE.length];
}

// Metro lines + stations come from the fetched dxbinteract data
// (public/data/dubai_metro_*.geojson). Icon ids must avoid '#'.
const iconIdFor = (color) => `station-${color.replace('#', '')}`;

// ctx.roundRect is not available in all browsers — manual path.
function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// DXB-Interact-style station marker: colored rounded square + white train glyph
// (drawn on canvas — map glyphs can't render custom icons).
function makeStationIcon(color) {
  const s = 44; // 2x for retina, rendered at 22px
  const c = document.createElement('canvas');
  c.width = s;
  c.height = s;
  const ctx = c.getContext('2d');
  // rounded square bg + white border
  roundRectPath(ctx, 2, 2, s - 4, s - 4, 12);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
  // train body
  ctx.fillStyle = '#ffffff';
  roundRectPath(ctx, 12, 9, 20, 22, 5);
  ctx.fill();
  // windows + door line (line color)
  ctx.fillStyle = color;
  ctx.fillRect(15, 13, 6, 6);
  ctx.fillRect(23, 13, 6, 6);
  ctx.fillRect(15, 22, 14, 3);
  // wheels
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(16, 35, 3, 0, Math.PI * 2);
  ctx.arc(28, 35, 3, 0, Math.PI * 2);
  ctx.fill();
  return ctx.getImageData(0, 0, s, s);
}

// POI marker colours.
const POI = {
  landmark: '#C9A84C', // gold
  medical: '#E5484D', // red
  school: '#4F46E5', // indigo
};

// Round POI marker: coloured circle + white border + white glyph (drawn on canvas).
function makePoiIcon(bg, glyph) {
  const s = 40; // 2x, rendered ~20px
  const c = document.createElement('canvas');
  c.width = s;
  c.height = s;
  const ctx = c.getContext('2d');
  ctx.beginPath();
  ctx.arc(s / 2, s / 2, s / 2 - 3, 0, Math.PI * 2);
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  glyph(ctx, s / 2);
  return ctx.getImageData(0, 0, s, s);
}

// white plus (medical)
function glyphPlus(ctx, c) {
  const w = 4;
  const l = 16;
  ctx.fillRect(c - w / 2, c - l / 2, w, l);
  ctx.fillRect(c - l / 2, c - w / 2, l, w);
}
// white graduation cap (school)
function glyphCap(ctx, c) {
  ctx.beginPath();
  ctx.moveTo(c, c - 7);
  ctx.lineTo(c + 11, c - 2.5);
  ctx.lineTo(c, c + 2);
  ctx.lineTo(c - 11, c - 2.5);
  ctx.closePath();
  ctx.fill();
  ctx.fillRect(c - 5, c, 10, 6); // base
  ctx.fillRect(c + 9, c - 2.5, 1.6, 8); // tassel
}
// white 5-point star (landmark)
function glyphStar(ctx, c) {
  const outer = 9;
  const inner = 4;
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const x = c + r * Math.cos(a);
    const y = c + r * Math.sin(a);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

const TOGGLES = [
  { key: 'metro', label: 'Metro Lines' },
  { key: 'landmarks', label: 'Landmarks' },
  { key: 'medical', label: 'Medical Centres' },
  { key: 'schools', label: 'Schools' },
  { key: 'projects', label: 'Project Numbers' },
];

const METRO_LAYER_IDS = ['metro-outline', 'metro-line', 'metro-station-fallback', 'metro-station-icons'];
const BADGE_LAYER_IDS = ['badge-circles', 'badge-counts'];
const LANDMARK_LAYER_IDS = ['landmark-icons'];
const MEDICAL_LAYER_IDS = ['medical-icons'];
const SCHOOL_LAYER_IDS = ['school-icons'];

// Centroid of the largest outer ring (handles Polygon + MultiPolygon).
function centroidOf(geometry) {
  let ring = [];
  if (geometry.type === 'Polygon') ring = geometry.coordinates[0] || [];
  else if (geometry.type === 'MultiPolygon') {
    geometry.coordinates.forEach((poly) => {
      if ((poly[0] || []).length > ring.length) ring = poly[0];
    });
  }
  if (!ring.length) return null;
  let x = 0;
  let y = 0;
  ring.forEach(([lng, lat]) => {
    x += lng;
    y += lat;
  });
  return [x / ring.length, y / ring.length];
}

// English only — never name:ar / name:ur.
function nameOf(props) {
  return props['name:en'] || props.name || '';
}

// Normalised community key so mock names match the map's names
// (case-insensitive, ignores any "(...)" suffix and extra spaces).
function normKey(name = '') {
  return name.toLowerCase().replace(/\(.*?\)/g, '').replace(/\s+/g, ' ').trim();
}

// Project-number badges use YOUR mock counts (passed in via projectCounts),
// keyed by community name. Only tiles that actually have projects get a badge.
function badgesGeoJSON(communities, counts = {}) {
  const lookup = {};
  Object.entries(counts).forEach(([k, v]) => {
    lookup[normKey(k)] = v;
  });
  return {
    type: 'FeatureCollection',
    features: (communities?.features || [])
      .map((f) => {
        const count = lookup[normKey(f.properties.__name)] ?? 0;
        if (!count) return null;
        const c = centroidOf(f.geometry);
        return c
          ? { type: 'Feature', properties: { count }, geometry: { type: 'Point', coordinates: c } }
          : null;
      })
      .filter(Boolean),
  };
}

export default function DubaiInteractiveMap({
  height = '600px',
  onCommunityClick,
  projectCounts = {},
  initialZoom = 10.5,
  center = [55.2744, 25.2048],
  focus = null,
}) {
  const ref = useRef(null);
  const mapRef = useRef(null);
  const hoverIdRef = useRef(null);
  const communitiesRef = useRef(null);
  const projectCountsRef = useRef(projectCounts);
  const dropdownRef = useRef(null);

  projectCountsRef.current = projectCounts;
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [layers, setLayers] = useState({
    metro: true,
    landmarks: false,
    medical: false,
    schools: false,
    projects: false,
  });

  // single-select: only one layer active at a time (clicking the active one clears it)
  const toggleLayer = (key) =>
    setLayers((prev) => {
      const cleared = { metro: false, landmarks: false, medical: false, schools: false, projects: false };
      return prev[key] ? cleared : { ...cleared, [key]: true };
    });

  // close dropdown on outside click only (stays open while toggling)
  useEffect(() => {
    if (!dropdownOpen) return;
    const onDown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [dropdownOpen]);

  // init map once: communities (always on) → metro → labels → badges (hidden)
  useEffect(() => {
    const map = new maplibregl.Map({
      container: ref.current,
      style: STYLE,
      center,
      zoom: initialZoom,
      minZoom: 1.5, // allow zooming out to the whole world
      maxZoom: 18,
      attributionControl: false,
    });
    mapRef.current = map;
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-left');

    // keep the canvas sized to its container so pan/zoom stay accurate (responsive)
    const resizeObserver = new ResizeObserver(() => map.resize());
    resizeObserver.observe(ref.current);

    map.on('load', async () => {
      // strip basemap clutter for a clean white-canvas look
      map.getStyle().layers.forEach((l) => {
        if (BASEMAP_CLUTTER.test(l.id)) {
          try {
            map.setLayoutProperty(l.id, 'visibility', 'none');
          } catch {}
        }
      });

      // 1. Community polygons — always visible
      try {
        const res = await fetch(COMMUNITIES_URL);
        const gj = await res.json();
        gj.features.forEach((f) => {
          f.properties.__name = nameOf(f.properties);
          f.properties.__color = tileColor(f.properties.__name); // our palette, not the source colour
          f.properties.__colorDark = darken(f.properties.__color);
        });
        communitiesRef.current = gj;

        map.addSource('communities', { type: 'geojson', data: gj, generateId: true });
        map.addLayer({
          id: 'comm-fill',
          type: 'fill',
          source: 'communities',
          paint: {
            // hover darkens the tile to a deeper shade of its own colour
            'fill-color': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              ['get', '__colorDark'],
              ['get', '__color'],
            ],
            'fill-opacity': 0.72,
          },
        });
        map.addLayer({
          id: 'comm-border',
          type: 'line',
          source: 'communities',
          paint: { 'line-color': '#3D3D3D', 'line-width': 1, 'line-dasharray': [2, 2.5] },
        });

        // Community name labels at centroids — visible at every zoom, English only
        const labelPoints = {
          type: 'FeatureCollection',
          features: gj.features
            .map((f) => {
              const c = centroidOf(f.geometry);
              return c
                ? {
                    type: 'Feature',
                    properties: { 'name:en': f.properties['name:en'], name: f.properties.__name },
                    geometry: { type: 'Point', coordinates: c },
                  }
                : null;
            })
            .filter(Boolean),
        };
        map.addSource('comm-labels', { type: 'geojson', data: labelPoints });
        map.addLayer({
          id: 'comm-labels',
          type: 'symbol',
          source: 'comm-labels',
          layout: {
            'text-field': ['coalesce', ['get', 'name:en'], ['get', 'name']],
            'text-font': MAP_FONT,
            // grow gently with zoom so names stay readable when zoomed out
            'text-size': ['interpolate', ['linear'], ['zoom'], 9, 10, 12, 13, 15, 15],
            'text-max-width': 7,
            // sit just above the centroid so the project-number badge can sit below it
            'text-anchor': 'bottom',
            'text-offset': [0, -0.4],
          },
          paint: { 'text-color': '#2b2b2b', 'text-halo-color': '#ffffff', 'text-halo-width': 1.4 },
        });
      } catch {
        // communities failed — base map still usable
      }

      // 2. Metro (exact dxbinteract data) — added hidden, toggled via dropdown
      try {
        const [linesGj, stationsGj] = await Promise.all([
          fetch(METRO_LINES_URL).then((r) => r.json()),
          fetch(METRO_STATIONS_URL).then((r) => r.json()),
        ]);
        stationsGj.features.forEach((f) => {
          f.properties.icon = iconIdFor(f.properties.color);
        });
        [...new Set(stationsGj.features.map((f) => f.properties.color))].forEach((color) => {
          try {
            if (!map.hasImage(iconIdFor(color))) map.addImage(iconIdFor(color), makeStationIcon(color), { pixelRatio: 2 });
          } catch {
            // canvas icon failed — circle fallback layer below still shows stations
          }
        });

        map.addSource('metro', { type: 'geojson', data: linesGj });
        map.addSource('metro-stations', { type: 'geojson', data: stationsGj });
        map.addLayer({
          id: 'metro-outline',
          type: 'line',
          source: 'metro',
          layout: { visibility: 'none', 'line-cap': 'round', 'line-join': 'round' },
          paint: { 'line-color': '#ffffff', 'line-width': 6, 'line-opacity': 0.6 },
        });
        map.addLayer({
          id: 'metro-line',
          type: 'line',
          source: 'metro',
          layout: { visibility: 'none', 'line-cap': 'round', 'line-join': 'round' },
          paint: { 'line-color': ['get', 'color'], 'line-width': 4 },
        });
        // circle fallback under the icons (visible if canvas icons ever fail)
        map.addLayer({
          id: 'metro-station-fallback',
          type: 'circle',
          source: 'metro-stations',
          layout: { visibility: 'none' },
          paint: {
            'circle-radius': 6,
            'circle-color': ['get', 'color'],
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 2,
          },
        });
        // station icons (colored square + train) — name shows ONLY on click
        map.addLayer({
          id: 'metro-station-icons',
          type: 'symbol',
          source: 'metro-stations',
          layout: {
            visibility: 'none',
            'icon-image': ['get', 'icon'],
            'icon-size': 1,
            'icon-allow-overlap': true,
            'icon-ignore-placement': true,
          },
        });
      } catch {
        // metro data failed — communities still render
      }
      map.on('click', 'metro-station-icons', (e) => {
        const f = e.features?.[0];
        if (!f) return;
        new maplibregl.Popup({ offset: 16, closeButton: true, className: 'p4-station-pop' })
          .setLngLat(f.geometry.coordinates)
          .setHTML(
            `<div style="font-family:Jost,sans-serif;padding:2px 6px;">
              <p style="margin:0;font-weight:700;font-size:12px;color:${BRAND.espresso};display:flex;align-items:center;gap:6px;">
                <span style="display:inline-block;width:9px;height:9px;border-radius:3px;background:${f.properties.color};"></span>${f.properties.name}</p>
            </div>`
          )
          .addTo(map);
      });
      map.on('mouseenter', 'metro-station-icons', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'metro-station-icons', () => {
        map.getCanvas().style.cursor = '';
      });

      // 4. POIs — landmarks / medical / schools as icon layers, toggled via dropdown
      try {
        const [landmarksGj, medicalGj, schoolsGj] = await Promise.all([
          fetch(LANDMARKS_URL).then((r) => r.json()),
          fetch(MEDICAL_URL).then((r) => r.json()),
          fetch(SCHOOLS_URL).then((r) => r.json()),
        ]);
        if (!map.hasImage('icon-landmark')) map.addImage('icon-landmark', makePoiIcon(POI.landmark, glyphStar), { pixelRatio: 2 });
        if (!map.hasImage('icon-medical')) map.addImage('icon-medical', makePoiIcon(POI.medical, glyphPlus), { pixelRatio: 2 });
        if (!map.hasImage('icon-school')) map.addImage('icon-school', makePoiIcon(POI.school, glyphCap), { pixelRatio: 2 });

        map.addSource('landmarks', { type: 'geojson', data: landmarksGj });
        map.addSource('medical', { type: 'geojson', data: medicalGj });
        map.addSource('schools', { type: 'geojson', data: schoolsGj });

        // landmarks: gold icon + permanent name label
        map.addLayer({
          id: 'landmark-icons',
          type: 'symbol',
          source: 'landmarks',
          layout: {
            visibility: 'none',
            'icon-image': 'icon-landmark',
            'icon-size': 1,
            'icon-allow-overlap': true,
            'icon-ignore-placement': true, // never push out community names
            'text-field': ['get', 'name'],
            'text-font': MAP_FONT_BOLD,
            'text-size': 11,
            'text-offset': [0, 1.2],
            'text-anchor': 'top',
            'text-allow-overlap': true,
            'text-ignore-placement': true,
            'text-optional': true,
          },
          paint: { 'text-color': '#8a6d27', 'text-halo-color': '#ffffff', 'text-halo-width': 1.4 },
        });
        // medical + schools: icon markers — ignore placement so community names stay visible
        map.addLayer({
          id: 'medical-icons',
          type: 'symbol',
          source: 'medical',
          layout: { visibility: 'none', 'icon-image': 'icon-medical', 'icon-size': 0.85, 'icon-allow-overlap': true, 'icon-ignore-placement': true },
        });
        map.addLayer({
          id: 'school-icons',
          type: 'symbol',
          source: 'schools',
          layout: { visibility: 'none', 'icon-image': 'icon-school', 'icon-size': 0.85, 'icon-allow-overlap': true, 'icon-ignore-placement': true },
        });

        const poiPopup = (e, html) =>
          new maplibregl.Popup({ offset: 14, closeButton: true }).setLngLat(e.features[0].geometry.coordinates).setHTML(html).addTo(map);
        const head = (name) =>
          `<p style="margin:0;font-weight:700;font-size:13px;color:${BRAND.espresso};">${name}</p>`;
        map.on('click', 'landmark-icons', (e) =>
          poiPopup(e, `<div style="font-family:Jost,sans-serif;padding:2px 4px;">${head(e.features[0].properties.name)}</div>`)
        );
        map.on('click', 'medical-icons', (e) =>
          poiPopup(
            e,
            `<div style="font-family:Jost,sans-serif;padding:2px 4px;">${head(e.features[0].properties.name)}
              <p style="margin:2px 0 0;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:${POI.medical};">Medical Centre</p></div>`
          )
        );
        map.on('click', 'school-icons', (e) =>
          poiPopup(
            e,
            `<div style="font-family:Jost,sans-serif;padding:2px 4px;">${head(e.features[0].properties.name)}
              <p style="margin:2px 0 0;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:${POI.school};">School</p></div>`
          )
        );
        ['landmark-icons', 'medical-icons', 'school-icons'].forEach((id) => {
          map.on('mouseenter', id, () => {
            map.getCanvas().style.cursor = 'pointer';
          });
          map.on('mouseleave', id, () => {
            map.getCanvas().style.cursor = '';
          });
        });
      } catch {
        // POI data failed — base map still renders
      }

      // 5. Project-number badges (circle + text layers) — added hidden, shown via dropdown
      map.addSource('badges', { type: 'geojson', data: badgesGeoJSON(communitiesRef.current, projectCountsRef.current) });
      map.addLayer({
        id: 'badge-circles',
        type: 'circle',
        source: 'badges',
        layout: { visibility: 'none' },
        paint: {
          'circle-radius': 14,
          'circle-color': '#1A1A1A',
          'circle-stroke-color': '#ffffff',
          'circle-stroke-width': 2,
          'circle-translate': [0, 18], // sit below the community name (centroid)
        },
      });
      map.addLayer({
        id: 'badge-counts',
        type: 'symbol',
        source: 'badges',
        layout: {
          visibility: 'none',
          'text-field': ['to-string', ['get', 'count']],
          'text-font': MAP_FONT_BOLD,
          'text-size': 12,
          'text-allow-overlap': true,
          'text-ignore-placement': true, // never push out community names
        },
        paint: { 'text-color': '#ffffff', 'text-translate': [0, 18] }, // match the circle
      });

      setReady(true);
      setLoading(false);
    });

    // hover: darken the tile only (no name tooltip)
    map.on('mousemove', 'comm-fill', (e) => {
      const f = e.features?.[0];
      if (!f) return;
      map.getCanvas().style.cursor = 'pointer';
      if (hoverIdRef.current !== null && hoverIdRef.current !== f.id) {
        map.setFeatureState({ source: 'communities', id: hoverIdRef.current }, { hover: false });
      }
      hoverIdRef.current = f.id;
      map.setFeatureState({ source: 'communities', id: f.id }, { hover: true });
    });
    map.on('mouseleave', 'comm-fill', () => {
      map.getCanvas().style.cursor = '';
      if (hoverIdRef.current !== null) {
        map.setFeatureState({ source: 'communities', id: hoverIdRef.current }, { hover: false });
        hoverIdRef.current = null;
      }
    });
    map.on('click', 'comm-fill', (e) => {
      const f = e.features?.[0];
      if (f && onCommunityClick) onCommunityClick(f.properties);
    });

    return () => {
      resizeObserver.disconnect();
      mapRef.current = null;
      map.remove();
    };
  }, []);

  // layer visibility — driven by the "Show" dropdown toggles
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    const groups = [
      [METRO_LAYER_IDS, layers.metro],
      [LANDMARK_LAYER_IDS, layers.landmarks],
      [MEDICAL_LAYER_IDS, layers.medical],
      [SCHOOL_LAYER_IDS, layers.schools],
      [BADGE_LAYER_IDS, layers.projects],
    ];
    groups.forEach(([ids, on]) => {
      ids.forEach((id) => {
        if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', on ? 'visible' : 'none');
      });
    });
  }, [ready, layers.metro, layers.landmarks, layers.medical, layers.schools, layers.projects]);

  // refresh badge counts when the mock projectCounts change
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    map.getSource('badges')?.setData(badgesGeoJSON(communitiesRef.current, projectCounts));
  }, [ready, projectCounts]);

  // optional: fly to an externally-selected community (controlled by a side panel)
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready || !focus?.center) return;
    map.flyTo({ center: focus.center, zoom: focus.zoom ?? 12.5, duration: 900, essential: true });
  }, [ready, focus?.center?.[0], focus?.center?.[1], focus?.zoom]);

  return (
    <div
      className="relative isolate w-full overflow-hidden rounded-2xl border border-[#3C1F0F]/10 bg-[#FAF6F0] shadow-[0_10px_34px_-16px_rgba(60,31,15,0.25)]"
      style={{ height, minHeight: 420 }}
    >
      <div ref={ref} className="h-full w-full" />

      {/* Show dropdown (top-right) */}
      <div ref={dropdownRef} className="absolute right-3 top-3 z-20">
        <button
          type="button"
          onClick={() => setDropdownOpen((o) => !o)}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#A0622A] bg-[#FAF6F0] px-4 py-2 font-[Jost,sans-serif] text-[13px] font-semibold text-[#3C1F0F] shadow-sm transition-colors hover:bg-[#f3ead9]"
        >
          Show
          <ChevronDown size={15} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 max-h-[70vh] min-w-[170px] overflow-auto rounded-xl border border-[#3C1F0F]/10 bg-white p-2 shadow-lg">
            {TOGGLES.map(({ key, label }) => (
              <label
                key={key}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2.5 py-2 hover:bg-[#FAF6F0]"
              >
                <span className="font-[Jost,sans-serif] text-[13px] text-[#3C1F0F]">{label}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={layers[key]}
                  onClick={() => toggleLayer(key)}
                  className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                    layers[key] ? 'bg-[#A0622A]' : 'bg-[#d8cfc2]'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
                      layers[key] ? 'left-[18px]' : 'left-0.5'
                    }`}
                  />
                </button>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Metro Lines legend (bottom-right, visible when metro is on) */}
      {layers.metro && (
        <div className="absolute bottom-8 right-3 z-10 rounded-xl border border-[#3C1F0F]/10 bg-white/95 p-3 shadow-lg backdrop-blur">
          <p className="mb-2 font-[Jost,sans-serif] text-[12px] font-bold text-[#1A1A1A]">Metro Lines</p>
          <div className="space-y-1.5">
            {[
              ['#EF4444', 'Red Line'],
              ['#22C55E', 'Green Line'],
              ['#2563EB', 'Blue Line (2029)'],
              ['#F97316', 'Orange (Tram)'],
              ['#C9A84C', 'Golden Line'],
            ].map(([color, label]) => (
              <div key={label} className="flex items-center gap-2">
                <span
                  className="flex h-4 w-4 items-center justify-center rounded-[5px] border border-white text-[9px] leading-none shadow-sm"
                  style={{ backgroundColor: color }}
                >
                  <span className="block h-1.5 w-2 rounded-[2px] bg-white" />
                </span>
                <span className="font-[Jost,sans-serif] text-[12px] text-[#3C1F0F]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 z-10 animate-pulse bg-[#FAF6F0]">
          <div className="flex h-full items-center justify-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A0622A]">Loading Dubai map…</span>
          </div>
        </div>
      )}
    </div>
  );
}
