'use client';

// prototype5 trusted-partners logo grid — Clearbit logo with wordmark fallback. Mock only.
import { useState } from 'react';

const PARTNERS = [
  { name: 'Emaar', domain: 'emaar.com' },
  { name: 'DAMAC', domain: 'damacproperties.com' },
  { name: 'Sobha', domain: 'sobharealty.com' },
  { name: 'Ellington', domain: 'ellingtonproperties.ae' },
  { name: 'Nakheel', domain: 'nakheel.com' },
  { name: 'Azizi', domain: 'azizidevelopments.com' },
  { name: 'Dubai Properties', domain: 'dubaiproperties.ae' },
  { name: 'Select Group', domain: 'select-group.ae' },
];

function Tile({ name, domain }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="flex h-20 items-center justify-center rounded-xl border border-gray-100 bg-white px-4 shadow-[0_8px_24px_-14px_rgba(20,18,15,0.18)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-14px_rgba(128,96,63,0.28)]">
      {failed ? (
        <span className="text-center text-sm font-bold uppercase tracking-wide text-[#5e4636]">{name}</span>
      ) : (
        <img
          src={`https://logo.clearbit.com/${domain}?size=160`}
          alt={name}
          draggable={false}
          onError={() => setFailed(true)}
          className="max-h-9 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0"
        />
      )}
    </div>
  );
}

export default function PartnerGrid() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {PARTNERS.map((p) => (
          <Tile key={p.name} {...p} />
        ))}
      </div>
      <div className="mt-5 flex items-center justify-center gap-1.5">
        {[0, 1, 2].map((d) => (
          <span key={d} className={`h-1.5 rounded-full transition-all ${d === 0 ? 'w-5 bg-[#80603f]' : 'w-1.5 bg-[#80603f]/25'}`} />
        ))}
      </div>
    </div>
  );
}
