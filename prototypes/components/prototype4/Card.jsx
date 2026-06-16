import Link from 'next/link';
import { Landmark, MapPin } from 'lucide-react';

export default function Card({ project, variant = 'offplan', discount }) {
  // Unsplash image utility — higher resolution for crisp card covers
  const imgUrl = (id) => `https://images.unsplash.com/${id}?w=900&q=85&auto=format&fit=crop`;
  const coverImage = project.gallery?.[0] || 'photo-1512453979798-5ea266f8880c';

  // Format currencies
  const priceFormatted = project.priceFrom.toLocaleString();

  // Distress calculations
  const DISCOUNTS = { 1: 18, 2: 15, 3: 12, 4: 22 };
  const off = discount || DISCOUNTS[project.id] || 15;
  const market = Math.round((project.priceFrom / (1 - off / 100)) / 1000) * 1000;
  const savings = market - project.priceFrom;

  return (
    <article className="group relative flex flex-col h-full bg-white border border-[#e8e2da] rounded-xl overflow-hidden shadow-xs hover:shadow-lg hover:border-[#80603f]/50 transition-all duration-300 transform hover:-translate-y-1">

      {/* Image container — slimmer aspect to keep the card compact */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#faf7f3] shrink-0">
        <img
          src={imgUrl(coverImage)}
          alt={project.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Subtle gradient so badges stay legible over any photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

        {/* Status badges — clean pill style */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {variant === 'offplan' && (
            <span className="inline-flex items-center gap-1.5 bg-white text-[#80603f] text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full shadow-sm ring-1 ring-black/5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#80603f]" />
              Off-Plan
            </span>
          )}
          {variant === 'distress' && (
            <>
              <span className="inline-flex items-center gap-1.5 bg-white text-[#b91c1c] text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full shadow-sm ring-1 ring-black/5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#b91c1c] animate-pulse" />
                Distress
              </span>
              <span className="bg-[#b91c1c] text-white text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full shadow-sm">
                {off}% Under Market
              </span>
            </>
          )}
          {variant === 'resale' && (
            <span className="inline-flex items-center gap-1.5 bg-white text-[#1e293b] text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full shadow-sm ring-1 ring-black/5">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-900" />
              Resale
            </span>
          )}
        </div>

        {/* Top-right serial number */}
        <span className="absolute top-3 right-3 bg-black/55 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider px-2 py-0.5 select-none font-mono rounded-full z-10">
          #{String(project.id).padStart(2, '0')}
        </span>
      </div>

      {/* Card Body - flex-grow forces uniform layout */}
      <div className="flex-grow flex flex-col justify-between p-4">
        <div>
          {/* Developer / Location — highlighted pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 bg-[#f5efe6] text-[#6a4b2e] text-[11px] font-bold px-2 py-0.5 rounded-md">
              <Landmark size={12} className="text-[#80603f]" />
              {project.developer}
            </span>
            <span className="inline-flex items-center gap-1 bg-[#f1f0ee] text-[#3f3a33] text-[11px] font-bold px-2 py-0.5 rounded-md">
              <MapPin size={12} className="text-[#80603f]" />
              {project.area}
            </span>
          </div>

          {/* Project Name — full name, no truncation, no arrow */}
          <h3 className="mt-2.5 text-xl font-bold tracking-tight text-[#2a2520] group-hover:text-[#80603f] transition-colors leading-snug font-[family-name:var(--font-heading)]">
            <Link href={`/prototype4/${project.id}`} className="focus:outline-none">
              {project.name}
            </Link>
          </h3>

          {/* Key-Value Metadata - 3 rows across all variants for identical heights */}
          <div className="mt-3 space-y-2 text-xs text-[#3f3a33]">

            {/* 1. Off-Plan Meta */}
            {variant === 'offplan' && (
              <>
                <div className="flex justify-between border-b border-[#efe9e0] pb-1.5">
                  <span className="text-[#6a6258] uppercase tracking-wider text-[10px] font-semibold">Est. Handover</span>
                  <span className="font-bold text-[#2a2520]">{project.handover}</span>
                </div>
                <div className="flex justify-between border-b border-[#efe9e0] pb-1.5">
                  <span className="text-[#6a6258] uppercase tracking-wider text-[10px] font-semibold">Construction</span>
                  <span className="font-bold text-[#2a2520]">
                    {project.completion < 1 ? (project.completion * 100).toFixed(0) : project.completion}% Completed
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6a6258] uppercase tracking-wider text-[10px] font-semibold">Payment Plan</span>
                  <span className="font-bold text-[#80603f]">{project.paymentPlan?.plan || 'Standard'} Plan</span>
                </div>
              </>
            )}

            {/* 2. Distress Meta */}
            {variant === 'distress' && (
              <>
                <div className="flex justify-between border-b border-[#efe9e0] pb-1.5">
                  <span className="text-[#6a6258] uppercase tracking-wider text-[10px] font-semibold">Market Value</span>
                  <span className="font-medium line-through text-[#2a2520]/50 font-mono">AED {market.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-[#efe9e0] pb-1.5">
                  <span className="text-[#6a6258] uppercase tracking-wider text-[10px] font-semibold">Est. Savings</span>
                  <span className="font-bold text-[#b91c1c] font-mono">AED {savings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6a6258] uppercase tracking-wider text-[10px] font-semibold">Deal Status</span>
                  <span className="font-bold text-[#b91c1c] uppercase tracking-wider text-[10px]">Motivated Seller</span>
                </div>
              </>
            )}

            {/* 3. Resale Meta */}
            {variant === 'resale' && (
              <>
                <div className="flex justify-between border-b border-[#efe9e0] pb-1.5">
                  <span className="text-[#6a6258] uppercase tracking-wider text-[10px] font-semibold">Expected ROI</span>
                  <span className="font-bold text-[#2a2520]">{project.roi}% ROI · {project.rentalYield}% Yield</span>
                </div>
                <div className="flex justify-between border-b border-[#efe9e0] pb-1.5">
                  <span className="text-[#6a6258] uppercase tracking-wider text-[10px] font-semibold">Price per Sqft</span>
                  <span className="font-bold text-[#2a2520] font-mono">AED {project.avgPricePerSqft.toLocaleString()} / sqft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6a6258] uppercase tracking-wider text-[10px] font-semibold">Property Status</span>
                  <span className="font-bold text-indigo-950 uppercase tracking-wider text-[10px]">Ready to Move</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Price & CTA Section */}
        <div className="mt-3 pt-3 border-t border-[#e8e2da] flex items-end justify-between shrink-0">
          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#6a6258]">
              {variant === 'distress' ? 'Distress Price' : 'Starting From'}
            </span>
            <div className="flex flex-col">
              {variant === 'distress' && (
                <span className="text-[11px] line-through text-[#2a2520]/45 font-mono">
                  AED {market.toLocaleString()}
                </span>
              )}
              <span className="text-xl font-bold font-mono tracking-tight text-[#6a4b2e] leading-none">
                AED {priceFormatted}
              </span>
            </div>
          </div>

          <Link
            href={`/prototype4/${project.id}`}
            className="rounded-lg bg-[#faf7f3] border border-[#e8e2da] hover:bg-[#80603f] hover:text-white hover:border-transparent text-[10px] font-bold uppercase tracking-wider px-3.5 py-2 transition-all duration-200"
          >
            Details
          </Link>
        </div>

      </div>
    </article>
  );
}
