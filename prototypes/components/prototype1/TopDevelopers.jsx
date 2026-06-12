'use client';

// prototype1 top-developers sidebar — searchable checkbox list. Mock only.
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { topDevelopers } from '@/mock/prototype1/home';

export default function TopDevelopers() {
  const [q, setQ] = useState('');
  const list = topDevelopers.filter((d) => d.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <aside className="rounded-3xl border border-gray-100 bg-white p-5 shadow-[0_14px_40px_-14px_rgba(20,18,15,0.22)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B89149]">Brands</p>
          <h3 className="mt-0.5 text-lg font-semibold text-[#1a1a1a]">Top Developers</h3>
        </div>
        <button className="text-gray-400 hover:text-gray-600" aria-label="Close">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="relative mt-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search developers..."
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-[#B89149] focus:bg-white"
        />
      </div>

      <ul className="mt-4 space-y-1">
        {list.map((d) => (
          <li key={d.id}>
            <label className="flex cursor-pointer items-center justify-between rounded-xl px-2.5 py-2.5 transition-colors hover:bg-[#B89149]/[0.07]">
              <span className="flex items-center gap-2.5 text-sm text-gray-700">
                <input type="checkbox" className="h-4 w-4 accent-[#B89149]" />
                {d.name} <span className="text-gray-400">({d.count})</span>
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {d.name}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-[#C8A24E] to-[#A37F3C] py-2.5 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg hover:brightness-105">
        View All Developers
      </button>
    </aside>
  );
}
