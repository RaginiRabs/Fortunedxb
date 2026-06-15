'use client';

// prototype1 contact map wrapper — dynamic (ssr:false) + info card overlay. Mock only.
import dynamic from 'next/dynamic';

const Inner = dynamic(() => import('@/components/prototype1/ContactMapInner'), {
  ssr: false,
  loading: () => <div className="grid h-full w-full place-items-center bg-gray-100 text-sm text-gray-400">Loading map…</div>,
});

export default function ContactMap() {
  return (
    <div className="relative isolate z-0 h-full min-h-[420px] overflow-hidden rounded-2xl border border-gray-100">
      <Inner />
      {/* info card */}
      <div className="absolute left-1/2 top-1/2 z-[500] flex w-60 -translate-x-1/4 -translate-y-1/2 gap-3 rounded-lg border border-gray-100 bg-white p-3 shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1546412414-e1885259563a?w=160&q=60&auto=format&fit=crop"
          alt="Fortune Realty LLC"
          className="h-14 w-14 shrink-0 rounded-md object-cover"
        />
        <div>
          <p className="text-[13px] font-semibold text-[#1a1a1a]">Fortune Realty LLC</p>
          <p className="mt-0.5 text-[11px] leading-snug text-gray-500">Office 3407, HDS Tower, Jumeirah Lake Towers, Dubai, UAE</p>
        </div>
      </div>
    </div>
  );
}
