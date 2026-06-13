// Location — focused pin map (Leaflet + clean Carto light) centred on THIS
// project, with metro + nearby pins. Clicking any item flies the map to it.
// prototype3 ONLY. Column-agnostic.
'use client';
import { useEffect, useRef } from 'react';
import { Train, MapPin, Navigation } from 'lucide-react';

// Deterministic offsets so mock metro/nearby get stable pin positions around
// the project (data has no per-POI geo). Angles fan out evenly per index.
const ring = (lat, lng, i, radius) => {
  const a = (i * 49 + 18) * (Math.PI / 180);
  return [lat + Math.sin(a) * radius, lng + Math.cos(a) * radius];
};

export default function Location({ project }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markers = useRef({}); // key -> { marker, latlng }

  const { lat, lng } = project.location.geo;

  useEffect(() => {
    let cancelled = false;
    const ensureLeaflet = () =>
      new Promise((resolve) => {
        if (window.L) return resolve(window.L);
        if (!document.getElementById('leaflet-css')) {
          const link = document.createElement('link');
          link.id = 'leaflet-css';
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);
        }
        const existing = document.getElementById('leaflet-js');
        if (existing) {
          existing.addEventListener('load', () => resolve(window.L));
          return;
        }
        const s = document.createElement('script');
        s.id = 'leaflet-js';
        s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        s.onload = () => resolve(window.L);
        document.body.appendChild(s);
      });

    ensureLeaflet().then((L) => {
      if (cancelled || !mapRef.current || mapInstance.current) return;
      const map = L.map(mapRef.current, { scrollWheelZoom: false, attributionControl: false }).setView([lat, lng], 14);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map);
      mapInstance.current = map;

      const pin = (color, glyph) =>
        L.divIcon({
          className: '',
          html: `<div style="background:${color};width:30px;height:30px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2.5px solid #fff;box-shadow:0 6px 14px rgba(10,10,18,.32);display:grid;place-items:center"><span style="transform:rotate(45deg);font-size:13px;line-height:1">${glyph}</span></div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -28],
        });

      // Project marker
      const proj = L.marker([lat, lng], { icon: pin('#C49A3C', '🏠'), zIndexOffset: 1000 })
        .addTo(map)
        .bindPopup(`<b>${project.name}</b><br>${project.location.name}`);
      markers.current.project = { marker: proj, latlng: [lat, lng] };

      // Metro markers
      project.metro.forEach((m, i) => {
        const ll = ring(lat, lng, i, 0.012);
        const mk = L.marker(ll, { icon: pin('#3E7BD6', 'Ⓜ') }).addTo(map).bindPopup(`<b>${m.name}</b><br>${m.line} · ${m.time}`);
        markers.current['metro-' + i] = { marker: mk, latlng: ll };
      });

      // Nearby markers
      project.nearby.forEach((n, i) => {
        const ll = ring(lat, lng, i + 2, 0.02);
        const mk = L.marker(ll, { icon: pin('#15151C', n.emoji) }).addTo(map).bindPopup(`<b>${n.name}</b><br>${n.time} away`);
        markers.current['near-' + i] = { marker: mk, latlng: ll };
      });

      setTimeout(() => map.invalidateSize(), 250);
    });

    return () => {
      cancelled = true;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [lat, lng]);

  const flyTo = (key) => {
    const m = markers.current[key];
    const map = mapInstance.current;
    if (!m || !map) return;
    map.flyTo(m.latlng, 15, { duration: 0.8 });
    m.marker.openPopup();
    mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="py-6 sm:py-8">
      <div className="mb-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C49A3C]">Connected</span>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0A0A12] sm:text-3xl">Location &amp; metro</h2>
        <p className="mt-2 max-w-2xl text-sm text-[#55555E]">
          {project.location.name} · {project.location.distance}. Tap a station or landmark to locate it on the map.
        </p>
      </div>

      {/* Map */}
      <div className="relative overflow-hidden rounded-2xl border border-black/10 shadow-[0_8px_30px_-22px_rgba(10,10,18,0.3)]">
        <div ref={mapRef} className="h-[280px] w-full sm:h-[360px]" />
        {/* Legend */}
        <div className="pointer-events-none absolute left-3 top-3 z-[500] flex flex-wrap gap-2">
          {[
            ['#C49A3C', 'Residence'],
            ['#3E7BD6', 'Metro'],
            ['#15151C', 'Nearby'],
          ].map(([c, l]) => (
            <span key={l} className="flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#2A2A32] shadow-sm backdrop-blur">
              <i className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: c }} /> {l}
            </span>
          ))}
        </div>
      </div>

      {/* Metro stations */}
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {project.metro.map((m, i) => (
          <button
            key={i}
            onClick={() => flyTo('metro-' + i)}
            className="group flex items-center gap-3 rounded-xl border border-black/10 bg-white p-3.5 text-left transition-colors hover:border-[#3E7BD6]/50"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#3E7BD6]/10 text-[#3E7BD6]">
              <Train size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-[#0A0A12]">{m.name}</div>
              <div className="text-xs text-[#9A9AA3]">{m.line}</div>
            </div>
            <span className="shrink-0 text-xs font-bold text-[#80603f]">{m.time}</span>
          </button>
        ))}
      </div>

      {/* Nearby */}
      <p className="mb-2.5 mt-5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9A9AA3]">
        <Navigation size={12} /> What&apos;s nearby
      </p>
      <div className="flex flex-wrap gap-2">
        {project.nearby.map((n, i) => (
          <button
            key={i}
            onClick={() => flyTo('near-' + i)}
            className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-2 text-sm transition-colors hover:border-[#C49A3C]/50 hover:bg-[#FAF7F3]"
          >
            <span>{n.emoji}</span>
            <span className="text-[#2A2A32]">{n.name}</span>
            <span className="font-semibold text-[#0A0A12]">{n.time}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
