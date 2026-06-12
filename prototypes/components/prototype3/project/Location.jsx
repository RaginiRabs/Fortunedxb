// Location + map + nearby. prototype3 ONLY.
'use client';
import { useEffect, useRef } from 'react';
import { dynamic } from 'next/dynamic';

export default function Location({ project }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    // Load Leaflet dynamically
    if (typeof window !== 'undefined' && !window.L) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = initMap;
      document.body.appendChild(script);
    } else if (window.L) {
      initMap();
    }
  }, []);

  const initMap = () => {
    if (!mapRef.current || mapInstance.current) return;

    const L = window.L;
    const map = L.map(mapRef.current).setView([project.location.geo.lat, project.location.geo.lng], 14);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map);
    mapInstance.current = map;

    const createIcon = (color, label) =>
      L.divIcon({
        html: `<div style="background:${color};width:26px;height:26px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2px solid #fff;box-shadow:0 4px 10px rgba(10,10,18,.3);display:grid;place-items:center"><span style="transform:rotate(45deg);font-size:11px">${label}</span></div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 26],
      });

    L.marker([project.location.geo.lat, project.location.geo.lng], { icon: createIcon('#C49A3C', '🏠') }).addTo(map);
    project.metro.forEach((m) => {
      L.marker([project.location.geo.lat - 0.0075, project.location.geo.lng + 0.0015], { icon: createIcon('#3E7BD6', 'Ⓜ') }).addTo(map);
    });

    setTimeout(() => map.invalidateSize(), 300);
  };

  return (
    <section className="py-12">
      <div className="wrap max-w-5xl mx-auto px-6">
        <div className="mb-6">
          <span className="eyebrow text-xs uppercase tracking-widest text-amber-600">Connected</span>
          <h2 className="font-serif text-4xl mt-3 text-black">Location & metro</h2>
          <p className="text-slate-600 text-sm mt-2 max-w-2xl">Steps from the water, minutes from the city. Two metro stations within easy reach.</p>
        </div>

        {/* Map */}
        <div ref={mapRef} className="rounded-2xl overflow-hidden border border-black/10 shadow-lg mb-4" style={{ height: '340px' }} />

        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-sm text-slate-600 mb-4">
          <span className="flex items-center gap-2"><i className="inline-block w-3.5 h-3.5 rounded-full bg-amber-600" /> The Residence</span>
          <span className="flex items-center gap-2"><i className="inline-block w-3.5 h-3.5 rounded-full bg-blue-500" /> Metro Station</span>
          <span className="flex items-center gap-2"><i className="inline-block w-3.5 h-3.5 rounded-full bg-black" /> Landmark</span>
        </div>

        {/* Metro stations */}
        <div className="space-y-2 mb-6">
          {project.metro.map((m, i) => (
            <div key={i} className="bg-white border border-black/10 rounded-lg p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="3" width="16" height="16" rx="3" />
                  <path d="M4 11h16M8 19l-2 3M16 19l2 3" />
                  <circle cx="8.5" cy="15" r="1" />
                  <circle cx="15.5" cy="15" r="1" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-black">{m.name}<span className="block text-xs text-slate-500 font-normal">{m.line}</span></div>
              </div>
              <div className="text-xs font-semibold text-amber-600 whitespace-nowrap">{m.time}</div>
            </div>
          ))}
        </div>

        {/* Nearby */}
        <div className="flex flex-wrap gap-2">
          {project.nearby.map((n, i) => (
            <span key={i} className="flex items-center gap-2 text-sm px-3 py-2 bg-white border border-black/10 rounded-full hover:border-amber-600/40 transition-colors">
              {n.emoji} <span>{n.name}</span> <span className="font-semibold text-black">{n.time}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
