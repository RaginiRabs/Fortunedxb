'use client';

// Location section — loads the Leaflet map client-side only (no SSR).
// prototype5 ONLY. Mock data.
import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';

const LocationMap = dynamic(() => import('./LocationMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[460px] w-full items-center justify-center rounded-2xl border border-black/[0.08] bg-[#eef2f5] text-sm text-[#9a917f]">
      Loading map…
    </div>
  ),
});

export default function Location({ geo, projectName, location, projectImage, projectImageFallback, connectivity }) {
  return (
    <section id="location" className="scroll-mt-24">
      <h2 className="text-[22px] font-semibold tracking-tight text-[#1A1A1A]">Location</h2>
      <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-[#6B6B6B]">
        <MapPin size={14} className="text-[#B0905E]" />
        {location}
      </p>
      <div className="mt-5">
        <LocationMap
          geo={geo}
          projectName={projectName}
          location={location}
          projectImage={projectImage}
          projectImageFallback={projectImageFallback}
          connectivity={connectivity}
        />
      </div>
    </section>
  );
}
