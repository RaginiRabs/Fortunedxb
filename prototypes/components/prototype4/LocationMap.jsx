'use client';

// DXB-Interact-style full market map. prototype ONLY — inline MOCK data.
// Areas mode  → community choropleth coloured by the selected metric.
// Projects mode → dimmed communities + per-community project-count badges.
// Metric dropdown (Avg Price / Sales Volume / Upcoming Supply), metro lines,
// realistic/normal basemap toggle, Show control, choropleth + metro legend,
// and a left stats panel on area click.
//
// ── SWAP REAL DATA HERE ─────────────────────────────────────────────
//   communities : GeoJSON FeatureCollection. Each feature.properties =
//                 { name, community_number, metrics:{ avgPrice, salesVolume, supply },
//                   center:[lat,lng], projectCount }
//                 → polygons from Dubai Municipality GIS / ArcGIS Hub "Dubai Communities".
//                 → metrics from DLD Open Data (Dubai Pulse), joined on community_number.
//   projects    : optional [{ id, name, lat, lng, community_number }]
// ────────────────────────────────────────────────────────────────────

import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ChevronDown, Train, Satellite, Map as MapIcon, Layers, Building2, X } from 'lucide-react';

const ESRI = 'https://server.arcgisonline.com/ArcGIS/rest/services';

// ── Metric config + choropleth ramp (cream → espresso, on-brand) ──────
const METRICS = {
  avgPrice:    { label: 'Avg Price',       unit: 'AED/sqft', fmt: (v) => `AED ${v.toLocaleString()}`, stops: [900, 1200, 1500, 1900, 2400] },
  salesVolume: { label: 'Sales Volume',    unit: 'sales/yr', fmt: (v) => v.toLocaleString(),          stops: [300, 700, 1200, 2000, 3000] },
  supply:      { label: 'Upcoming Supply', unit: 'units',    fmt: (v) => v.toLocaleString(),          stops: [1000, 3000, 6000, 10000, 15000] },
};
const RAMP = ['#F1E4CF', '#E3C79B', '#C9A06B', '#A8794E', '#6E4B30', '#3A2A20'];
function rampColor(v, stops) {
  let i = 0;
  while (i < stops.length && v >= stops[i]) i++;
  return RAMP[i];
}

// White train glyph for metro stations.
const TRAIN =
  '<path d="M5 3h14a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3l2 3h-2l-2-3H8l-2 3H4l2-3a3 3 0 0 1-3-3V5a2 2 0 0 1 2-2zm0 4v4h14V7H5zm3 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm8 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>';

function stationIcon(color) {
  return L.divIcon({
    className: '',
    html: `<div style="width:18px;height:18px;border-radius:5px;background:${color};
      display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.4);">
      <svg viewBox="0 0 24 24" width="11" height="11" fill="#fff">${TRAIN}</svg></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

// Black project-count badge (DXB-style) shown in Projects mode.
function countIcon(n) {
  return L.divIcon({
    className: '',
    html: `<div style="min-width:34px;height:34px;padding:0 6px;border-radius:17px;background:#1A1A1A;color:#fff;
      display:flex;align-items:center;justify-content:center;font-weight:600;font-size:13px;
      border:2px solid #fff;box-shadow:0 2px 7px rgba(0,0,0,.45);">${n}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
}

// ── Inline MOCK (replace via props with real GeoJSON + DLD metrics) ───
const sq = (lat, lng, d = 0.013) => [[
  [lat + d, lng - d], [lat + d, lng + d], [lat - d, lng + d], [lat - d, lng - d],
]];
const mockCommunity = (name, code, lat, lng, avgPrice, salesVolume, supply, projectCount) => ({
  type: 'Feature',
  properties: { name, community_number: code, center: [lat, lng], projectCount, metrics: { avgPrice, salesVolume, supply } },
  geometry: { type: 'Polygon', coordinates: sq(lat, lng).map((ring) => ring.map(([la, ln]) => [ln, la])) },
});
const MOCK_COMMUNITIES = {
  type: 'FeatureCollection',
  features: [
    mockCommunity('Downtown Dubai', 345, 25.196, 55.274, 2350, 2900, 14000, 17),
    mockCommunity('Business Bay', 346, 25.185, 55.262, 1850, 2400, 11000, 11),
    mockCommunity('Dubai Marina', 392, 25.080, 55.142, 1700, 3100, 6200, 10),
    mockCommunity('Jumeirah Beach Residence', 393, 25.078, 55.133, 1900, 1200, 800, 8),
    mockCommunity('Palm Jumeirah', 391, 25.112, 55.138, 2400, 900, 2100, 4),
    mockCommunity('Jumeirah Village Circle', 640, 25.058, 55.209, 980, 3000, 15000, 80),
    mockCommunity('Dubai Hills Estate', 671, 25.103, 55.245, 1450, 1800, 9000, 17),
    mockCommunity('Al Barsha First', 373, 25.113, 55.196, 1150, 700, 1200, 2),
  ],
};
const MOCK_METRO = [
  { id: 'red', label: 'Red Line', color: '#E0292B', path: [[25.226, 55.286], [25.197, 55.279], [25.142, 55.231], [25.092, 55.150], [25.063, 55.139]] },
  { id: 'green', label: 'Green Line', color: '#16A34A', path: [[25.268, 55.318], [25.252, 55.333], [25.246, 55.300]] },
];
const DUBAI = { center: [25.13, 55.21], zoom: 11 };

export default function MarketMap({
  communities = MOCK_COMMUNITIES,
  metroLines = MOCK_METRO,
  center = DUBAI.center,
  zoom = DUBAI.zoom,
}) {
  const [mode, setMode] = useState('areas');          // 'areas' | 'projects'
  const [metric, setMetric] = useState('avgPrice');
  const [basemap, setBasemap] = useState('realistic'); // 'realistic' | 'normal'
  const [showMetro, setShowMetro] = useState(true);
  const [metricOpen, setMetricOpen] = useState(false);
  const [selected, setSelected] = useState(null);     // clicked feature.properties
  const M = METRICS[metric];

  // GeoJSON polygon styling — choropleth in Areas mode, faint in Projects mode.
  const styleFeature = (feature) => {
    const v = feature.properties.metrics[metric];
    return {
      fillColor: rampColor(v, M.stops),
      weight: 1,
      color: '#ffffff',
      fillOpacity: mode === 'areas' ? 0.72 : 0.12,
      dashArray: mode === 'areas' ? undefined : '3 4',
    };
  };

  const onEachFeature = (feature, layer) => {
    const p = feature.properties;
    layer.bindTooltip(`${p.name} — ${M.fmt(p.metrics[metric])}`, { sticky: true, direction: 'top' });
    layer.on({
      click: () => setSelected(p),
      mouseover: (e) => e.target.setStyle({ weight: 2.5, fillOpacity: mode === 'areas' ? 0.85 : 0.25 }),
      mouseout: (e) => e.target.setStyle(styleFeature(feature)),
    });
  };

  // Re-key GeoJSON so style recomputes when metric/mode changes.
  const geoKey = useMemo(() => `${metric}-${mode}`, [metric, mode]);

  return (
    <div className="relative isolate h-[560px] w-full overflow-hidden rounded-2xl border border-black/[0.08]">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom className="h-full w-full" style={{ background: '#0b1622' }}>
        {basemap === 'realistic' ? (
          <>
            <TileLayer attribution="Tiles &copy; Esri" url={`${ESRI}/World_Imagery/MapServer/tile/{z}/{y}/{x}`} maxZoom={19} />
            <TileLayer url={`${ESRI}/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}`} maxZoom={19} />
            <TileLayer url={`${ESRI}/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}`} maxZoom={19} />
          </>
        ) : (
          <TileLayer attribution="Tiles &copy; Esri" url={`${ESRI}/World_Street_Map/MapServer/tile/{z}/{y}/{x}`} maxZoom={19} />
        )}

        {/* Community choropleth */}
        <GeoJSON key={geoKey} data={communities} style={styleFeature} onEachFeature={onEachFeature} />

        {/* Metro line polylines + stations */}
        {showMetro &&
          metroLines.map((line) => (
            <Polyline key={line.id} positions={line.path} pathOptions={{ color: line.color, weight: 5, opacity: 0.9 }} />
          ))}
        {showMetro &&
          metroLines.flatMap((line) =>
            line.path.map((pos, i) => (
              <Marker key={`${line.id}-${i}`} position={pos} icon={stationIcon(line.color)}>
                <Tooltip>{line.label} — Station {i + 1}</Tooltip>
              </Marker>
            ))
          )}

        {/* Project-count badges (Projects mode) */}
        {mode === 'projects' &&
          communities.features.map((f) => (
            <Marker key={f.properties.community_number} position={f.properties.center} icon={countIcon(f.properties.projectCount)}>
              <Popup>
                <strong>{f.properties.name}</strong>
                <br />
                {f.properties.projectCount} projects
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      {/* Basemap toggle (top-left) */}
      <div className="absolute left-3 top-3 z-[1000] flex rounded-full border border-black/10 bg-white p-1 shadow-sm">
        <button
          type="button"
          onClick={() => setBasemap('realistic')}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
            basemap === 'realistic' ? 'bg-[#1A1A1A] text-white' : 'text-[#5B5B5B] hover:bg-black/[0.04]'
          }`}
        >
          <Satellite size={14} /> Realistic
        </button>
        <button
          type="button"
          onClick={() => setBasemap('normal')}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
            basemap === 'normal' ? 'bg-[#1A1A1A] text-white' : 'text-[#5B5B5B] hover:bg-black/[0.04]'
          }`}
        >
          <MapIcon size={14} /> Normal
        </button>
      </div>

      {/* Areas ⇄ Projects toggle (top-center) */}
      <div className="absolute left-1/2 top-3 z-[1000] flex -translate-x-1/2 rounded-full border border-black/10 bg-white p-1 shadow-sm">
        <button
          type="button"
          onClick={() => setMode('areas')}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${
            mode === 'areas' ? 'bg-[#B0905E] text-white' : 'text-[#5B5B5B] hover:bg-black/[0.04]'
          }`}
        >
          <Layers size={14} /> Areas
        </button>
        <button
          type="button"
          onClick={() => setMode('projects')}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${
            mode === 'projects' ? 'bg-[#B0905E] text-white' : 'text-[#5B5B5B] hover:bg-black/[0.04]'
          }`}
        >
          <Building2 size={14} /> Projects
        </button>
      </div>

      {/* Metric dropdown + Metro toggle (top-right) */}
      <div className="absolute right-3 top-3 z-[1000] flex flex-col items-end gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => setMetricOpen((o) => !o)}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-2 text-[13px] font-medium text-[#1A1A1A] shadow-sm hover:bg-black/[0.03]"
          >
            {M.label}
            <ChevronDown size={15} className={`transition-transform ${metricOpen ? 'rotate-180' : ''}`} />
          </button>
          {metricOpen && (
            <div className="mt-2 w-48 rounded-xl border border-black/10 bg-white p-1.5 shadow-lg">
              {Object.entries(METRICS).map(([key, cfg]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setMetric(key);
                    setMetricOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    metric === key ? 'bg-[#F3E9DA] text-[#6E4B30]' : 'text-[#3A3A3A] hover:bg-black/[0.03]'
                  }`}
                >
                  {cfg.label}
                  <span className="text-[11px] text-[#9a917f]">{cfg.unit}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => setShowMetro((s) => !s)}
          className={`inline-flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-[12px] font-medium shadow-sm transition-colors ${
            showMetro ? 'bg-[#1A1A1A] text-white' : 'bg-white text-[#5B5B5B] hover:bg-black/[0.03]'
          }`}
        >
          <Train size={13} /> Metro
        </button>
      </div>

      {/* Choropleth legend (bottom-right) */}
      <div className="absolute bottom-3 right-3 z-[1000] rounded-xl border border-black/10 bg-white/95 p-3 shadow-lg backdrop-blur">
        <p className="mb-1.5 text-[12px] font-semibold text-[#1A1A1A]">
          {M.label} <span className="font-normal text-[#9a917f]">({M.unit})</span>
        </p>
        <div className="flex items-center gap-1">
          {RAMP.map((c, i) => (
            <span key={c} className="flex flex-col items-center">
              <span className="h-3 w-7" style={{ backgroundColor: c }} />
              <span className="mt-0.5 text-[9px] text-[#7a7264]">{i < M.stops.length ? M.stops[i] : ''}</span>
            </span>
          ))}
        </div>
        {showMetro && (
          <ul className="mt-2 space-y-1 border-t border-black/[0.06] pt-2">
            {metroLines.map((line) => (
              <li key={line.id} className="flex items-center gap-2 text-[11px] text-[#3A3A3A]">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: line.color }} />
                {line.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Area stats panel (bottom-left) — on click */}
      {selected && (
        <div className="absolute bottom-3 left-3 z-[1000] w-64 rounded-xl border border-black/10 bg-white p-4 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#B0905E]">Community #{selected.community_number}</p>
              <h3 className="text-[17px] font-semibold text-[#1A1A1A]">{selected.name}</h3>
            </div>
            <button type="button" onClick={() => setSelected(null)} className="text-[#9a917f] hover:text-[#1A1A1A]">
              <X size={16} />
            </button>
          </div>
          <dl className="mt-3 space-y-2 text-[13px]">
            <div className="flex justify-between border-b border-black/[0.06] pb-1.5">
              <dt className="text-[#6B6B6B]">Avg Price</dt>
              <dd className="font-semibold text-[#1A1A1A]">{METRICS.avgPrice.fmt(selected.metrics.avgPrice)}</dd>
            </div>
            <div className="flex justify-between border-b border-black/[0.06] pb-1.5">
              <dt className="text-[#6B6B6B]">Sales Volume</dt>
              <dd className="font-semibold text-[#1A1A1A]">{selected.metrics.salesVolume.toLocaleString()}/yr</dd>
            </div>
            <div className="flex justify-between border-b border-black/[0.06] pb-1.5">
              <dt className="text-[#6B6B6B]">Upcoming Supply</dt>
              <dd className="font-semibold text-[#1A1A1A]">{selected.metrics.supply.toLocaleString()} units</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#6B6B6B]">Projects</dt>
              <dd className="font-semibold text-[#1A1A1A]">{selected.projectCount}</dd>
            </div>
          </dl>``
        </div>
      )}
    </div>
  );
}