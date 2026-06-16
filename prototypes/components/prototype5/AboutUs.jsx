// prototype5 about section — covers the About Us menu. Mock only.
import { CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { aboutStats, aboutPoints, ctaImage } from '@/mock/prototype5/home';

export default function AboutUs() {
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
      {/* Image */}
      <div className="relative">
        <div className="overflow-hidden rounded-3xl shadow-[0_24px_60px_-20px_rgba(20,18,15,0.35)]">
          <img src={ctaImage} alt="Fortune Realty Dubai" className="h-[420px] w-full object-cover" />
        </div>
        <div className="absolute -bottom-6 -right-2 hidden items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_18px_44px_-16px_rgba(20,18,15,0.30)] sm:flex">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[#96714a] to-[#6b4f33] text-white">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <span>
            <span className="block text-lg font-bold text-[#1a1a1a]">RERA Certified</span>
            <span className="block text-xs text-gray-400">Licensed & Regulated</span>
          </span>
        </div>
      </div>

      {/* Text */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#80603f]">About Us</p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight text-[#1a1a1a] md:text-4xl">
          Your Trusted Real Estate Partner in Dubai
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-gray-500">
          Fortune Realty LLC is a trusted advisory firm helping investors and homeowners discover premium
          off-plan, ready, resale and distress opportunities across Dubai&apos;s most sought-after communities.
        </p>

        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {aboutPoints.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-[13px] text-gray-600">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#80603f]" /> {p}
            </li>
          ))}
        </ul>

        <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {aboutStats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-gray-100 bg-white px-3 py-3 text-center shadow-[0_10px_30px_-14px_rgba(20,18,15,0.18)]">
              <div className="text-xl font-bold text-[#80603f]">{s.value}</div>
              <div className="mt-0.5 text-[11px] text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>

        <a href="#" className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#96714a] to-[#6b4f33] px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg hover:brightness-105">
          Learn More About Us <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
