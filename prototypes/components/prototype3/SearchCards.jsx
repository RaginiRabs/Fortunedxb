'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import Card from '@/components/prototype3/Card';

// Search bar + responsive card grid. Filters by project name, developer or area.
export default function SearchCards({ projects, placeholder = 'Search by project, developer or area…' }) {
  const [q, setQ] = useState('');
  const s = q.trim().toLowerCase();
  const filtered = !s
    ? projects
    : projects.filter((p) => [p.name, p.developer, p.area].some((v) => v.toLowerCase().includes(s)));

  return (
    <div>
      {/* Search bar — directly below the navbar/header */}
      <div className="relative mb-8 max-w-xl">
        <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9AA3]" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-full border border-[rgba(10,10,18,0.12)] bg-white py-3.5 pl-11 pr-4 text-sm text-[#0A0A12] outline-none transition placeholder:text-[#9A9AA3] focus:border-[#C49A3C] focus:ring-2 focus:ring-[#C49A3C]/15"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-sm text-[#9A9AA3]">No properties match “{q}”.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Card key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
