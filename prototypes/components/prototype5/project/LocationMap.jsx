'use client';

// Interactive Leaflet map for the project location. prototype5 ONLY. Mock data.
// Basemap toggle (Realistic satellite / Normal street, both English), metro
// lines + stations, toggleable POIs ("Show" control), and a metro legend.
import { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ChevronDown, Train, Satellite, Map as MapIcon, Car } from 'lucide-react';
import { srcCandidates } from './img';

// Inline white SVG glyphs (crisp inside Leaflet divIcons — no emoji).
const SVG = {
  cross: '<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',
  train:
    '<path d="M5 3h14a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3l2 3h-2l-2-3H8l-2 3H4l2-3a3 3 0 0 1-3-3V5a2 2 0 0 1 2-2zm0 4v4h14V7H5zm3 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm8 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>',
  cap: '<path d="M12 3 1 9l11 6 9-4.9V17h2V9zM5 13.2V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-3.8l-7 3.8z"/>',
  home: '<path d="M12 3 2 12h3v8h5v-5h4v5h5v-8h3z"/>',
};

const CATEGORIES = [
  { key: 'landmarks', label: 'Landmarks', color: '#7C3AED', glyph: null }, // photo pins
  { key: 'medicals', label: 'Medicals', color: '#DC2626', glyph: SVG.cross },
  { key: 'metros', label: 'Metros', color: '#2563EB', glyph: SVG.train },
  { key: 'schools', label: 'Schools', color: '#0F766E', glyph: SVG.cap },
];

// Teardrop pin with a white SVG glyph centred inside.
function glyphIcon(color, glyph, big = false) {
  const s = big ? 40 : 30;
  const g = big ? 18 : 14;
  return L.divIcon({
    className: '',
    html: `<div style="
      width:${s}px;height:${s}px;border-radius:50% 50% 50% 0;
      background:${color};transform:rotate(-45deg);
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 3px 8px rgba(0,0,0,.45);border:2.5px solid #fff;">
      <svg viewBox="0 0 24 24" width="${g}" height="${g}" fill="#fff"
        style="transform:rotate(45deg);">${glyph}</svg>
    </div>`,
    iconSize: [s, s],
    iconAnchor: [s / 2, s],
    popupAnchor: [0, -s],
  });
}

// Small rounded-square metro station marker (train glyph in the line colour).
function stationIcon(color) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:18px;height:18px;border-radius:5px;background:${color};
      display:flex;align-items:center;justify-content:center;
      border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.4);">
      <svg viewBox="0 0 24 24" width="11" height="11" fill="#fff">${SVG.train}</svg>
    </div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

// Photo pin (circular image) — the "real image" look (landmarks + project).
// `sources` is a list of candidate URLs tried in order via an onerror chain.
function photoIcon(sources, color, size = 42) {
  const tail = Math.round(size * 0.22);
  const total = size + tail;
  const list = (sources || []).filter(Boolean);
  const first = list[0] || '';
  const arr = JSON.stringify(list).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  const onErr = list.length > 1
    ? `onerror="(function(el){el.__i=(el.__i||0)+1;var a=${arr};if(el.__i<a.length){el.src=a[el.__i];}else{el.onerror=null;}})(this)"`
    : '';
  return L.divIcon({
    className: '',
    html: `<div style="display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 3px 5px rgba(0,0,0,.4));">
      <div style="width:${size}px;height:${size}px;border-radius:50%;border:3px solid ${color};overflow:hidden;background:#eee;">
        <img src="${first}" ${onErr} style="width:100%;height:100%;object-fit:cover;" />
      </div>
      <div style="width:0;height:0;border-left:${tail - 1}px solid transparent;border-right:${tail - 1}px solid transparent;border-top:${tail + 2}px solid ${color};margin-top:-1px;"></div>
    </div>`,
    iconSize: [size, total],
    iconAnchor: [size / 2, total],
    popupAnchor: [0, -total + 3],
  });
}

const ESRI = 'https://server.arcgisonline.com/ArcGIS/rest/services';

// Gates wheel-zoom behind Ctrl/Cmd so plain scrolling passes through to the page.
// (Leaflet preventDefaults the wheel only while zoom is enabled → no browser zoom.)
function ScrollZoomGate({ onBlocked }) {
  const map = useMap();
  useEffect(() => {
    map.scrollWheelZoom.disable();
    const enable = (e) => (e.key === 'Control' || e.key === 'Meta') && map.scrollWheelZoom.enable();
    const disable = (e) => (e.key === 'Control' || e.key === 'Meta') && map.scrollWheelZoom.disable();
    const offAll = () => map.scrollWheelZoom.disable();
    const onWheel = (e) => {
      if (e.ctrlKey || e.metaKey) map.scrollWheelZoom.enable();
      else onBlocked();
    };
    const c = map.getContainer();
    c.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', enable);
    window.addEventListener('keyup', disable);
    window.addEventListener('blur', offAll);
    return () => {
      c.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', enable);
      window.removeEventListener('keyup', disable);
      window.removeEventListener('blur', offAll);
    };
  }, [map, onBlocked]);
  return null;
}

export default function LocationMap({ geo, projectName, location, projectImage, projectImageFallback, connectivity = [] }) {
  const [show, setShow] = useState({ landmarks: false, medicals: false, metros: true, schools: false, nearby: false });
  const [open, setOpen] = useState(false);
  const [basemap, setBasemap] = useState('normal'); // 'realistic' | 'normal'
  const [hint, setHint] = useState(false);
  const hintTimer = useRef();
  const activeCount = Object.values(show).filter(Boolean).length;

  const toggle = (key) => setShow((s) => ({ ...s, [key]: !s[key] }));

  const flashHint = useCallback(() => {
    setHint(true);
    clearTimeout(hintTimer.current);
    hintTimer.current = setTimeout(() => setHint(false), 1300);
  }, []);

  return (
    <div className="relative isolate h-[480px] w-full overflow-hidden rounded-2xl border border-black/[0.08]">
      <MapContainer
        center={geo.center}
        zoom={geo.zoom}
        scrollWheelZoom={false}
        zoomControl={false}
        className="h-full w-full"
        style={{ background: '#0b1622' }}
      >
        <ScrollZoomGate onBlocked={flashHint} />
        <ZoomControl position="bottomleft" />
        {basemap === 'realistic' ? (
          <>
            {/* Realistic satellite imagery + English labels/roads overlay */}
            <TileLayer attribution="Tiles &copy; Esri" url={`${ESRI}/World_Imagery/MapServer/tile/{z}/{y}/{x}`} maxZoom={19} />
            <TileLayer url={`${ESRI}/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}`} maxZoom={19} />
            <TileLayer url={`${ESRI}/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}`} maxZoom={19} />
          </>
        ) : (
          /* Normal clean street map (English) */
          <TileLayer attribution="Tiles &copy; Esri" url={`${ESRI}/World_Street_Map/MapServer/tile/{z}/{y}/{x}`} maxZoom={19} />
        )}

        {/* Metro line polylines */}
        {geo.metroLines.map((line) => (
          <Polyline
            key={line.id}
            positions={line.path}
            pathOptions={{ color: line.color, weight: 5, opacity: 0.9, dashArray: line.dashed ? '8 8' : undefined }}
          />
        ))}

        {/* Metro stations (along the lines) — shown with the Metros toggle */}
        {show.metros &&
          geo.metroLines
            .filter((line) => line.stations)
            .flatMap((line) =>
              line.path.map((pos, i) => (
                <Marker key={`${line.id}-${i}`} position={pos} icon={stationIcon(line.color)}>
                  <Tooltip>{line.label} — Station {i + 1}</Tooltip>
                </Marker>
              ))
            )}

        {/* Project pin — shows the project image (falls back to a home glyph) */}
        <Marker
          position={geo.center}
          icon={projectImage ? photoIcon([...srcCandidates(projectImage), projectImageFallback], '#B0905E', 56) : glyphIcon('#B0905E', SVG.home, true)}
          zIndexOffset={1000}
        >
          <Popup>
            <strong>{projectName}</strong>
            <br />
            {location}
          </Popup>
        </Marker>

        {/* Toggleable POIs (landmarks / medicals / schools) */}
        {CATEGORIES.filter((c) => c.key !== 'metros').map((cat) =>
          show[cat.key]
            ? (geo.pois[cat.key] || []).map((p) => (
                <Marker
                  key={p.id}
                  position={[p.lat, p.lng]}
                  icon={p.img ? photoIcon(srcCandidates(p.img), cat.color) : glyphIcon(cat.color, cat.glyph)}
                >
                  <Tooltip>{p.name}</Tooltip>
                </Marker>
              ))
            : null
        )}
      </MapContainer>

      {/* Scroll hint — appears briefly when scrolling without Ctrl */}
      <div
        className={`pointer-events-none absolute inset-0 z-[1100] flex items-center justify-center transition-opacity duration-300 ${
          hint ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="rounded-full bg-black/70 px-4 py-2 text-sm font-medium text-white shadow-lg">
          Hold Ctrl + scroll to zoom
        </span>
      </div>

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

      {/* "Show" control (top-right) */}
      <div className="absolute right-3 top-3 z-[1000]">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-2 text-[13px] font-medium text-[#1A1A1A] shadow-sm hover:bg-black/[0.03]"
        >
          Show
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#16A34A] px-1 text-[11px] font-semibold text-white">
            {activeCount}
          </span>
          <ChevronDown size={15} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div className="mt-2 w-52 rounded-xl border border-black/10 bg-white p-1.5 shadow-lg">
            {CATEGORIES.map((cat) => (
              <label
                key={cat.key}
                className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-[#3A3A3A] hover:bg-black/[0.03]"
              >
                {cat.label}
                <input
                  type="checkbox"
                  checked={show[cat.key]}
                  onChange={() => toggle(cat.key)}
                  className="peer sr-only"
                />
                <span className="relative h-5 w-9 rounded-full bg-black/15 transition-colors peer-checked:bg-[#16A34A] after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-4" />
              </label>
            ))}

            {connectivity.length > 0 && (
              <>
                <div className="my-1 border-t border-black/[0.06]" />
                <label className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-[#3A3A3A] hover:bg-black/[0.03]">
                  Nearby (drive times)
                  <input
                    type="checkbox"
                    checked={show.nearby}
                    onChange={() => toggle('nearby')}
                    className="peer sr-only"
                  />
                  <span className="relative h-5 w-9 rounded-full bg-black/15 transition-colors peer-checked:bg-[#16A34A] after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-4" />
                </label>
              </>
            )}
          </div>
        )}
      </div>

      {/* Nearby drive-times panel — toggled from the Show dropdown */}
      {show.nearby && connectivity.length > 0 && (
        <div className="absolute left-3 top-16 z-[1000] w-60 max-h-[320px] overflow-y-auto rounded-xl border border-black/10 bg-white/95 p-3 shadow-lg backdrop-blur [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <p className="mb-2 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1A1A1A]">
            <Car size={13} className="text-[#B0905E]" /> Nearby — drive times
          </p>
          <ul className="space-y-1.5">
            {connectivity.map((c) => (
              <li key={c.place} className="flex items-center justify-between gap-3 text-[12px] text-[#3A3A3A]">
                <span>{c.place}</span>
                <span className="shrink-0 font-semibold text-[#1A1A1A]">{c.time}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Metro Lines legend (bottom-right) */}
      <div className="absolute bottom-3 right-3 z-[1000] rounded-xl border border-black/10 bg-white/95 p-3 shadow-lg backdrop-blur">
        <p className="mb-1.5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1A1A1A]">
          <Train size={13} /> Metro Lines
        </p>
        <ul className="space-y-1">
          {geo.metroLines.map((line) => (
            <li key={line.id} className="flex items-center gap-2 text-[12px] text-[#3A3A3A]">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: line.color }} />
              {line.label}
              {line.note && <span className="italic text-[#9a917f]">{line.note}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
