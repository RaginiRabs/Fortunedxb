'use client';

// DXB-Interact-style market map on MapLibre GL (no token) + free OpenFreeMap
// vector tiles. Community choropleth by metric, Areas/Projects toggle, metric
// dropdown, legend, and a click stats panel. MOCK polygons — swap real GeoJSON
// in mock/prototype4/communities.js.
import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { ChevronDown, Layers, Building2, X } from 'lucide-react';
import { COMMUNITIES, METRICS, RAMP, rampExpression, DUBAI, normalizeFeatures, bounds } from '@/mock/prototype4/communities';

const STYLE = 'https://tiles.openfreemap.org/styles/positron';
// Drop a real GeoJSON here to replace the mock polygons (auto-loaded).
const REAL_GEOJSON = '/mock/prototype4/communities.geojson';

function badgeEl(n) {
  const el = document.createElement('div');
  el.innerHTML = `<div style="min-width:30px;height:30px;padding:0 6px;border-radius:15px;background:#1A1A1A;color:#fff;
    display:flex;align-items:center;justify-content:center;font:600 12px sans-serif;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.4);">${n}</div>`;
  return el.firstChild;
}

export default function MarketMapGL({ center = DUBAI.center, zoom = DUBAI.zoom }) {
  const ref = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const metricRef = useRef('avgPrice');
  const popupRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [data, setData] = useState(COMMUNITIES);
  const dataRef = useRef(COMMUNITIES);
  const [mode, setMode] = useState('areas');
  const [metric, setMetric] = useState('avgPrice');
  const [metricOpen, setMetricOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const M = METRICS[metric];

  // init map once
  useEffect(() => {
    const map = new maplibregl.Map({
      container: ref.current,
      style: STYLE,
      center,
      zoom,
      attributionControl: false,
    });
    mapRef.current = map;
    map.addControl(new maplibregl.AttributionControl({ compact: true }));
    popupRef.current = new maplibregl.Popup({ closeButton: false, closeOnClick: false, offset: 10, className: 'p4-pop' });

    map.on('load', () => {
      map.addSource('communities', { type: 'geojson', data: dataRef.current });
      map.addLayer({ id: 'comm-fill', type: 'fill', source: 'communities', paint: { 'fill-color': rampExpression('avgPrice'), 'fill-opacity': 0.7 } });
      map.addLayer({ id: 'comm-line', type: 'line', source: 'communities', paint: { 'line-color': '#ffffff', 'line-width': 1.2 } });
      setReady(true);
    });

    map.on('click', 'comm-fill', (e) => {
      if (e.features?.[0]) setSelected(e.features[0].properties);
    });
    map.on('mousemove', 'comm-fill', (e) => {
      map.getCanvas().style.cursor = 'pointer';
      const f = e.features?.[0];
      if (!f) return;
      const m = metricRef.current;
      popupRef.current
        .setLngLat(e.lngLat)
        .setHTML(`<strong>${f.properties.name}</strong><br/>${METRICS[m].fmt(f.properties[m])} <span style="color:#9a917f">${METRICS[m].unit}</span>`)
        .addTo(map);
    });
    map.on('mouseleave', 'comm-fill', () => {
      map.getCanvas().style.cursor = '';
      popupRef.current.remove();
    });

    return () => map.remove();
  }, []);

  // try to load a real GeoJSON dropped in /public (auto-replaces mock)
  useEffect(() => {
    let alive = true;
    fetch(REAL_GEOJSON)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!alive || !j || !j.features || !j.features.length) return;
        const norm = normalizeFeatures(j);
        dataRef.current = norm;
        setData(norm);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  // push data to the source + fit bounds when it changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready || !map.isStyleLoaded()) return;
    const src = map.getSource('communities');
    if (src) src.setData(data);
    try {
      map.fitBounds(bounds(data), { padding: 50, duration: 600, maxZoom: 13 });
    } catch {}
  }, [data, ready]);

  // choropleth recolour on metric / mode change
  useEffect(() => {
    metricRef.current = metric;
    const map = mapRef.current;
    if (!map || !ready || !map.isStyleLoaded()) return;
    map.setPaintProperty('comm-fill', 'fill-color', rampExpression(metric));
    map.setPaintProperty('comm-fill', 'fill-opacity', mode === 'areas' ? 0.7 : 0.14);
  }, [metric, mode, ready]);

  // project-count badges (projects mode)
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready || !map.isStyleLoaded()) return;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    if (mode === 'projects') {
      data.features.forEach((f) => {
        const marker = new maplibregl.Marker({ element: badgeEl(f.properties.projectCount) })
          .setLngLat(f.properties.center)
          .addTo(map);
        markersRef.current.push(marker);
      });
    }
  }, [mode, ready, data]);

  return (
    <div className="relative isolate h-[560px] w-full overflow-hidden rounded-2xl border border-black/[0.08]">
      <div ref={ref} className="h-full w-full" />

      {/* Areas ⇄ Projects toggle (top-left) */}
      <div className="absolute left-3 top-3 z-10 flex rounded-full border border-black/10 bg-white p-1 shadow-sm">
        <button
          type="button"
          onClick={() => setMode('areas')}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${
            mode === 'areas' ? 'bg-[#80603f] text-white' : 'text-[#4a4138] hover:bg-black/[0.04]'
          }`}
        >
          <Layers size={14} /> Areas
        </button>
        <button
          type="button"
          onClick={() => setMode('projects')}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${
            mode === 'projects' ? 'bg-[#80603f] text-white' : 'text-[#4a4138] hover:bg-black/[0.04]'
          }`}
        >
          <Building2 size={14} /> Projects
        </button>
      </div>

      {/* Metric dropdown (top-right) */}
      <div className="absolute right-3 top-3 z-10">
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
                  metric === key ? 'bg-[#faf3ea] text-[#6a4b2e]' : 'text-[#3A3A3A] hover:bg-black/[0.03]'
                }`}
              >
                {cfg.label}
                <span className="text-[11px] text-[#8a7f70]">{cfg.unit}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Legend (bottom-left) */}
      <div className="absolute bottom-3 left-3 z-10 rounded-xl border border-black/10 bg-white/95 p-3 shadow-lg backdrop-blur">
        <p className="mb-1.5 text-[12px] font-semibold text-[#1A1A1A]">
          {M.label} <span className="font-normal text-[#8a7f70]">({M.unit})</span>
        </p>
        <div className="flex items-center gap-1">
          {RAMP.map((c, i) => (
            <span key={c} className="flex flex-col items-center">
              <span className="h-3 w-7" style={{ backgroundColor: c }} />
              <span className="mt-0.5 text-[9px] text-[#7a7264]">{i < M.stops.length ? M.stops[i] : ''}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Stats panel (bottom-right) on click */}
      {selected && (
        <div className="absolute bottom-3 right-3 z-10 w-64 rounded-xl border border-black/10 bg-white p-4 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#80603f]">Community #{selected.community_number}</p>
              <h3 className="text-[17px] font-semibold text-[#1A1A1A]">{selected.name}</h3>
            </div>
            <button type="button" onClick={() => setSelected(null)} className="text-[#8a7f70] hover:text-[#1A1A1A]">
              <X size={16} />
            </button>
          </div>
          <dl className="mt-3 space-y-2 text-[13px]">
            <div className="flex justify-between border-b border-black/[0.06] pb-1.5">
              <dt className="text-[#6B6B6B]">Avg Price</dt>
              <dd className="font-semibold text-[#1A1A1A] tabular-nums">{METRICS.avgPrice.fmt(selected.avgPrice)}</dd>
            </div>
            <div className="flex justify-between border-b border-black/[0.06] pb-1.5">
              <dt className="text-[#6B6B6B]">Sales Volume</dt>
              <dd className="font-semibold text-[#1A1A1A] tabular-nums">{selected.salesVolume.toLocaleString()}/yr</dd>
            </div>
            <div className="flex justify-between border-b border-black/[0.06] pb-1.5">
              <dt className="text-[#6B6B6B]">Upcoming Supply</dt>
              <dd className="font-semibold text-[#1A1A1A] tabular-nums">{selected.supply.toLocaleString()} units</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#6B6B6B]">Projects</dt>
              <dd className="font-semibold text-[#1A1A1A] tabular-nums">{selected.projectCount}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}
