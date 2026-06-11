import Link from 'next/link';
import { Landmark, ArrowUpRight } from 'lucide-react';

export default function Card({ project, variant = 'offplan', discount }) {
  // Unsplash image utility
  const imgUrl = (id) => `https://images.unsplash.com/${id}?w=600&q=80&auto=format&fit=crop`;
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
      
      {/* Image container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#faf7f3] shrink-0 border-b border-[#e8e2da]/40">
        <img
          src={imgUrl(coverImage)}
          alt={project.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
          loading="lazy"
        />
        
        {/* Sleek, professional rectangular status badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {variant === 'offplan' && (
            <span className="bg-white/95 text-[#80603f] border border-[#80603f]/30 text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 shadow-xs rounded-xs">
              Off-Plan
            </span>
          )}
          {variant === 'distress' && (
            <>
              <span className="bg-[#fff5f5] text-[#b91c1c] border border-[#fecaca] text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 shadow-xs rounded-xs">
                Distress
              </span>
              <span className="bg-[#b91c1c] text-white text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 shadow-xs rounded-xs">
                {off}% Under Market
              </span>
            </>
          )}
          {variant === 'resale' && (
            <span className="bg-white/95 text-[#1e293b] border border-[#e2e8f0] text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 shadow-xs rounded-xs">
              Resale
            </span>
          )}
        </div>

        {/* Top-right serial number */}
        <span className="absolute top-3 right-3 bg-black/55 text-white text-[9px] font-bold tracking-wider px-2 py-0.5 select-none font-mono rounded-xs">
          #{String(project.id).padStart(2, '0')}
        </span>
      </div>

      {/* Card Body - flex-grow forces uniform layout */}
      <div className="flex-grow flex flex-col justify-between p-6">
        <div>
          {/* Developer / Location */}
          <div className="flex items-center justify-between text-[10px] text-[#574e44]/80 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Landmark size={11} className="text-[#80603f]" />
              {project.developer}
            </span>
            <span>{project.area}</span>
          </div>

          {/* Project Name */}
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#2a2520] group-hover:text-[#80603f] transition-colors line-clamp-1 font-[family-name:var(--font-heading)]">
            <Link href={`/prototype4/${project.id}`} className="focus:outline-none flex items-center justify-between">
              {project.name}
              <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#80603f]" />
            </Link>
          </h3>

          {/* Clean Key-Value Metadata - 3 rows across all cards to ensure identical heights without gaps */}
          <div className="mt-5 space-y-2.5 text-xs text-[#574e44]">
            
            {/* 1. Off-Plan Meta */}
            {variant === 'offplan' && (
              <>
                <div className="flex justify-between border-b border-[#f5f1ea]/60 pb-1.5">
                  <span className="text-[#675c4e]/70 uppercase tracking-wider text-[9px] font-bold">Est. Handover</span>
                  <span className="font-extrabold text-[#2a2520]">{project.handover}</span>
                </div>
                <div className="flex justify-between border-b border-[#f5f1ea]/60 pb-1.5">
                  <span className="text-[#675c4e]/70 uppercase tracking-wider text-[9px] font-bold">Construction</span>
                  <span className="font-extrabold text-[#2a2520]">
                    {project.completion < 1 ? (project.completion * 100).toFixed(0) : project.completion}% Completed
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#675c4e]/70 uppercase tracking-wider text-[9px] font-bold">Payment Plan</span>
                  <span className="font-extrabold text-[#80603f]">{project.paymentPlan?.plan || 'Standard'} Plan</span>
                </div>
              </>
            )}

            {/* 2. Distress Meta */}
            {variant === 'distress' && (
              <>
                <div className="flex justify-between border-b border-[#f5f1ea]/60 pb-1.5">
                  <span className="text-[#675c4e]/70 uppercase tracking-wider text-[9px] font-bold">Market Value</span>
                  <span className="font-medium line-through text-[#2a2520]/45 font-mono">AED {market.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-[#f5f1ea]/60 pb-1.5">
                  <span className="text-[#675c4e]/70 uppercase tracking-wider text-[9px] font-bold">Est. Savings</span>
                  <span className="font-extrabold text-[#b91c1c] font-mono">AED {savings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#675c4e]/70 uppercase tracking-wider text-[9px] font-bold">Deal Status</span>
                  <span className="font-extrabold text-[#b91c1c] uppercase tracking-wider text-[9px]">Motivated Seller</span>
                </div>
              </>
            )}

            {/* 3. Resale Meta */}
            {variant === 'resale' && (
              <>
                <div className="flex justify-between border-b border-[#f5f1ea]/60 pb-1.5">
                  <span className="text-[#675c4e]/70 uppercase tracking-wider text-[9px] font-bold">Expected ROI</span>
                  <span className="font-extrabold text-[#2a2520]">{project.roi}% ROI · {project.rentalYield}% Yield</span>
                </div>
                <div className="flex justify-between border-b border-[#f5f1ea]/60 pb-1.5">
                  <span className="text-[#675c4e]/70 uppercase tracking-wider text-[9px] font-bold">Price per Sqft</span>
                  <span className="font-extrabold text-[#2a2520] font-mono">AED {project.avgPricePerSqft.toLocaleString()} / sqft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#675c4e]/70 uppercase tracking-wider text-[9px] font-bold">Property Status</span>
                  <span className="font-extrabold text-indigo-950 uppercase tracking-wider text-[9px]">Ready to Move</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Price & CTA Section */}
        <div className="mt-5 pt-4 border-t border-[#e8e2da] flex items-end justify-between shrink-0">
          <div>
            <span className="block text-[9px] font-bold uppercase tracking-wider text-[#675c4e]">
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
