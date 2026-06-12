'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  Waves, Dumbbell, ShieldCheck, Trees, Car, ShoppingBag, Baby, Utensils,
  Sparkles, Film, Bike, Anchor, Home, Briefcase, BellRing, Wine, Check,
  TrainFront, GraduationCap, Plane, HeartPulse, MapPin, ChevronUp, ChevronLeft, ChevronRight, Download, Eye, X, Expand,
  Wallet, CalendarClock, Building2, TrendingUp, Percent, Plus,
} from 'lucide-react';
import { CURRENCIES, formatMoney, formatMoneyShort } from '@/mock/prototype4/currency';

// Minimal: single flat brown accent (no gradient).
const GRAD = 'bg-[#80603f]';
const GRAD_TEXT = 'text-[#6a4b2e]';
const TEXT = 'text-[#2a2520]';
const BODY = 'text-[#4a4138]';
const MUTED = 'text-[#574e44]';
const LABEL = 'text-[#675c4e]';
const DOCS = '/mock/prototype4';
const INPUT = 'w-full rounded-lg border border-[#e8e2da] px-3.5 py-2.5 text-sm text-[#2a2520] placeholder:text-[#9b9085] outline-none transition focus:border-[#80603f] focus:ring-2 focus:ring-[#80603f]/20';

const img = (id) => `https://images.unsplash.com/${id}?w=1200&q=80&auto=format&fit=crop`;
const GALLERY_LABELS = ['Exterior', 'Lobby', 'Amenities', 'Interiors', 'Surroundings', 'Skyline'];
const planImageFor = (name) => {
  const n = name.toLowerCase();
  if (n.includes('4 bed')) return `${DOCS}/plan-4bed.svg`;
  if (n.includes('3 bed')) return `${DOCS}/plan-3bed.svg`;
  if (n.includes('2 bed')) return `${DOCS}/plan-2bed.svg`;
  if (n.includes('1 bed')) return `${DOCS}/plan-1bed.svg`;
  if (n.includes('studio')) return `${DOCS}/plan-studio.svg`;
  return `${DOCS}/plan-1bed.svg`;
};
const ytEmbed = (url) => {
  const m = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
  return `https://www.youtube.com/embed/${m ? m[1] : ''}`;
};

const TABS = [
  ['Overview', 'overview'],
  ['Market data', 'market-data'],
  ['Payment Plan', 'payment-plan'],
  ['Unit Plans', 'floor-plans'],
  ['Specifications', 'specifications'],
  ['Location', 'location'],
  ['FAQ', 'faq'],
];

// Varied muted accents for unit-distribution bar + legend (amber, blue, green, red, violet).
const DIST_COLORS = ['#d98c34', '#2f6fae', '#2e8b57', '#b35454', '#6b5b95'];
// Amenity icon-tile tones — three colours only (blue, green, violet), cycled equally.
const TILE_TONES = ['bg-[#2f6fae]', 'bg-[#2e8b57]', 'bg-[#6b5b95]'];
// Payment-plan milestone circle tones (border + text).
const STEP_TONES = [
  ['border-[#2f6fae]', 'text-[#2f6fae]'],
  ['border-[#2e8b57]', 'text-[#2e8b57]'],
  ['border-[#6b5b95]', 'text-[#6b5b95]'],
  ['border-[#b35454]', 'text-[#b35454]'],
  ['border-[#80603f]', 'text-[#6a4b2e]'],
];

const MarketMap = dynamic(() => import('@/components/prototype4/MarketMapGL'), {
  ssr: false,
  loading: () => <div className="h-[560px] rounded-2xl border border-[#e8e2da] bg-[#faf7f3] animate-pulse" />,
});

function amenityIcon(name) {
  const n = name.toLowerCase();
  if (n.includes('pool')) return Waves;
  if (n.includes('gym') || n.includes('fitness') || n.includes('yoga')) return Dumbbell;
  if (n.includes('security')) return ShieldCheck;
  if (n.includes('garden') || n.includes('park')) return Trees;
  if (n.includes('parking') || n.includes('valet') || n.includes('ev ')) return Car;
  if (n.includes('retail') || n.includes('mall') || n.includes('promenade') || n.includes('boardwalk')) return ShoppingBag;
  if (n.includes('kids') || n.includes('nursery')) return Baby;
  if (n.includes('dining') || n.includes('restaurant')) return Utensils;
  if (n.includes('spa') || n.includes('wellness')) return Sparkles;
  if (n.includes('cinema')) return Film;
  if (n.includes('cycling') || n.includes('bike')) return Bike;
  if (n.includes('marina') || n.includes('yacht') || n.includes('boat') || n.includes('beach')) return Anchor;
  if (n.includes('smart')) return Home;
  if (n.includes('co-working') || n.includes('coworking')) return Briefcase;
  if (n.includes('concierge')) return BellRing;
  if (n.includes('lounge')) return Wine;
  return Check;
}

function nearbyIcon(type) {
  return {
    metro: TrainFront, mall: ShoppingBag, beach: Waves,
    hospital: HeartPulse, school: GraduationCap, airport: Plane,
  }[type] || MapPin;
}

export default function ProjectDetails({ project }) {
  const [curIdx, setCurIdx] = useState(0);
  const [faqOpen, setFaqOpen] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [planModal, setPlanModal] = useState(null);
  const [planIdx, setPlanIdx] = useState(0);
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadIntent, setLeadIntent] = useState('Buy');
  const [lead, setLead] = useState({ name: '', phone: '', email: '' });
  const [leadSent, setLeadSent] = useState(false);
  const cur = CURRENCIES[curIdx];
  const money = (n) => formatMoney(n, cur);
  const moneyM = (n) => formatMoneyShort(n, cur);
  const gLen = project.gallery.length;

  useEffect(() => {
    if (lightbox) return;
    const t = setInterval(() => setActiveImg((i) => (i + 1) % gLen), 5000);
    return () => clearInterval(t);
  }, [gLen, lightbox]);

  // scroll-spy: highlight the section nearest the top
  useEffect(() => {
    const ids = TABS.map(([, a]) => a);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-150px 0px -65% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!planModal && !leadOpen) return;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setPlanModal(null);
      closeLead();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [planModal, leadOpen]);

  const goTo = (anchor) => (e) => {
    e.preventDefault();
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollTop = (e) => {
    e.currentTarget.closest('.no-scrollbar')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLead = (intent) => {
    if (intent) setLeadIntent(intent);
    setLeadSent(false);
    setLeadOpen(true);
  };
  const closeLead = () => {
    setLeadOpen(false);
    setLeadSent(false);
    setLead({ name: '', phone: '', email: '' });
  };
  const submitLead = (e) => {
    e.preventDefault();
    if (!lead.name.trim() || !lead.phone.trim() || !lead.email.trim()) return;
    setLeadSent(true);
  };

  return (
    <div>
      {/* Sticky tab nav + currency toggle — sticks below the main navbar */}
      <nav className="sticky top-[81px] md:top-[89px] z-30 bg-white/95 backdrop-blur border-b border-[#e8e2da]">
        <div className="mx-auto max-w-6xl px-6 flex items-center gap-5 overflow-x-auto no-scrollbar">
          {TABS.map(([label, anchor]) => {
            const active = activeSection === anchor;
            return (
              <a
                key={anchor}
                href={`#${anchor}`}
                onClick={goTo(anchor)}
                className={`relative whitespace-nowrap py-4 text-[13px] tracking-[0.02em] transition-colors ${
                  active ? 'text-[#80603f] font-semibold' : `${BODY} font-medium hover:text-[#80603f]`
                }`}
              >
                {label}
                <span className={`absolute left-0 right-0 -bottom-px h-0.5 rounded-full ${GRAD} transition-opacity duration-200 ${active ? 'opacity-100' : 'opacity-0'}`} />
              </a>
            );
          })}
          <div className="ml-auto py-2.5 shrink-0">
            <div className="relative flex rounded-lg bg-[#f3ede5] p-1" style={{ width: `${CURRENCIES.length * 48}px` }}>
              <span
                className={`absolute top-1 bottom-1 rounded-md ${GRAD} transition-transform duration-200 ease-out`}
                style={{ width: `calc((100% - 0.5rem) / ${CURRENCIES.length})`, left: '0.25rem', transform: `translateX(${curIdx * 100}%)` }}
              />
              {CURRENCIES.map((c, i) => (
                <button
                  key={c.code}
                  onClick={() => setCurIdx(i)}
                  className={`relative z-10 flex-1 text-[11px] font-bold py-1 rounded-md transition-colors ${
                    i === curIdx ? 'text-white' : `${MUTED} hover:text-[#2a2520]`
                  }`}
                >
                  {c.code}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero gallery — featured image (left) + vertical thumbnails (right) */}
      <div className="mx-auto max-w-6xl px-6 pt-6">
       <div className="grid gap-3 md:grid-cols-[1fr_120px]">
        {/* Featured image */}
        <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-[#e6e1d8] md:aspect-auto md:h-[460px]">
          {project.gallery.map((g, i) => (
            <img
              key={i}
              src={img(g)}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === activeImg ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />

          {/* caption + counter (prototype1 style) */}
          <span className="absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
            {GALLERY_LABELS[activeImg % GALLERY_LABELS.length]}
          </span>
          <span className="absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-1 text-[12px] font-medium text-white backdrop-blur-sm">
            {activeImg + 1} / {gLen}
          </span>

          {/* expand */}
          <button
            type="button"
            onClick={() => setLightbox(true)}
            aria-label="View fullscreen"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-[#2a2520] shadow transition hover:bg-white"
          >
            <Expand size={17} />
          </button>

          {/* arrows (on hover) */}
          <button
            type="button"
            onClick={() => setActiveImg((activeImg - 1 + gLen) % gLen)}
            aria-label="Previous"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#2a2520] opacity-0 shadow transition hover:bg-white group-hover:opacity-100"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => setActiveImg((activeImg + 1) % gLen)}
            aria-label="Next"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#2a2520] opacity-0 shadow transition hover:bg-white group-hover:opacity-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Thumbnails — vertical strip on the right (horizontal scroll on mobile) */}
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1 md:h-[460px] md:flex-col md:overflow-x-visible md:overflow-y-auto md:pb-0">
          {project.gallery.map((g, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveImg(i)}
              aria-label={`Image ${i + 1}`}
              className={`relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-2xl transition md:aspect-auto md:min-h-0 md:w-full md:flex-1 ${
                i === activeImg
                  ? 'ring-2 ring-[#80603f] ring-offset-2 ring-offset-[#faf7f3]'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img(g)} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
       </div>
      </div>

      {/* Fullscreen lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[2000] flex flex-col bg-black/92 backdrop-blur-sm" onClick={() => setLightbox(false)}>
          <div className="flex items-center justify-between px-5 py-4 text-white/80">
            <span className="text-sm uppercase tracking-[0.18em]">
              {project.name} · {activeImg + 1}/{gLen}
            </span>
            <button type="button" onClick={() => setLightbox(false)} className="rounded-full p-1.5 hover:bg-white/10">
              <X size={22} />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-4 pb-6" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setActiveImg((activeImg - 1 + gLen) % gLen)} className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <ChevronLeft size={22} />
            </button>
            <div className="aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-xl bg-black/30 shadow-2xl">
              <img src={img(project.gallery[activeImg])} alt="" className="h-full w-full object-cover" />
            </div>
            <button type="button" onClick={() => setActiveImg((activeImg + 1) % gLen)} className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <ChevronRight size={22} />
            </button>
          </div>
          <div className="flex justify-center gap-2 px-4 pb-5" onClick={(e) => e.stopPropagation()}>
            {project.gallery.map((g, i) => (
              <button key={i} type="button" onClick={() => setActiveImg(i)} className={`h-12 w-16 overflow-hidden rounded-md ring-2 transition ${i === activeImg ? 'ring-white' : 'ring-transparent opacity-60 hover:opacity-100'}`}>
                <img src={img(g)} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Project title + meta (below gallery, prototype1 style) */}
      <div className="mx-auto max-w-6xl px-6 pt-7">
        <h1 className="text-3xl font-bold uppercase leading-tight font-[family-name:var(--font-heading)] text-[#2a2520] md:text-5xl">
          {project.name}
        </h1>
        <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#574e44]">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={15} className="text-[#80603f]" /> {project.area}
          </span>
          <span className="text-black/20">·</span>
          <span>{project.developer}</span>
          <span className="ml-1 rounded-full bg-[#80603f]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#6a4b2e]">
            Project
          </span>
        </p>
      </div>

      {/* Quick-facts card */}
      <div className="mx-auto max-w-6xl px-6 pt-6">
        <div className="rounded-2xl border border-[#e8e2da] bg-white shadow-[0_10px_34px_-16px_rgba(42,37,32,0.28)] grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-[#e8e2da] overflow-hidden">
          {[
            ['Price From', moneyM(project.priceFrom), Wallet, 'bg-[#faf7f3] text-[#80603f]'],
            ['Handover', project.handover, CalendarClock, 'bg-[#eef4fa] text-[#2f6fae]'],
            ['Total Units', project.totalUnits.toLocaleString(), Building2, 'bg-[#f1effa] text-[#6b5b95]'],
            ['Est. ROI', `${project.roi}%`, TrendingUp, 'bg-[#ecf6f0] text-[#2e8b57]'],
            ['Rental Yield', `${project.rentalYield}%`, Percent, 'bg-[#faeeee] text-[#b35454]'],
          ].map(([label, value, Icon, tone], i) => (
            <div key={i} className={`flex items-center gap-3 px-5 py-4 transition-colors hover:bg-[#faf7f3] ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
              <span className={`h-9 w-9 rounded-lg ${tone} flex items-center justify-center shrink-0`}>
                <Icon size={17} />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.12em] text-[#675c4e]">{label}</p>
                <p className="text-base md:text-lg font-bold text-[#2a2520] tabular-nums font-[family-name:var(--font-heading)] leading-tight">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-28 lg:pb-24 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          {/* Main column */}
          <div className="min-w-0">
            {/* Overview */}
            <section id="overview" className="pt-8 scroll-mt-36">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <span className="block text-[13px] font-black tracking-[0.2em] text-[#80603f] mb-1.5">01 —</span>
                  <h2 className={`text-[28px] font-bold font-[family-name:var(--font-heading)] ${TEXT}`}>Overview</h2>
                </div>
                <span className="inline-block rounded-full bg-[#80603f]/15 text-[#6a4b2e] text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1">
                  Project
                </span>
              </div>

              <div className="mt-5">
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className={`${LABEL} uppercase tracking-[0.12em]`}>Construction Progress</span>
                  <span className="font-bold text-[#2e8b57]">{project.completion}% completed</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-[#efe8df] overflow-hidden">
                  <div className="bg-[#2e8b57] h-full rounded-full" style={{ width: `${Math.max(project.completion, 1)}%` }} />
                </div>
              </div>

              <p className={`mt-6 text-[15px] ${BODY} leading-[1.8] max-w-2xl`}>{project.description}</p>
            </section>

            {/* Market Highlights */}
            <section id="market-data" className="pt-12 scroll-mt-36">
              <SectionTitle no="02">Market Highlights</SectionTitle>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Stat label="Total Units" value={project.totalUnits.toLocaleString()} />
                <Stat label="Launch Date" value={project.launchDate} />
                <Stat label="Handover" value={project.handover} />
                <Stat label="Status" value={project.status} />
                <Stat label="Avg Price / Sqft" value={money(project.avgPricePerSqft)} />
                <Stat label="Sales Volume" value={project.salesVolume.toLocaleString()} />
                <Stat label="Est. ROI" value={`${project.roi}%`} highlight tone="green" />
                <Stat label="Rental Yield" value={`${project.rentalYield}%`} highlight tone="green" />
                <Stat label="Price From" value={moneyM(project.priceFrom)} />
              </div>
            </section>

            {/* Payment Plan — separated panel, horizontal stepper */}
            <section id="payment-plan" className="pt-12 scroll-mt-36">
              <div className="rounded-2xl bg-[#faf7f3] border border-[#e8e2da] p-6 md:p-8">
                <SectionTitle no="03">Payment Plan</SectionTitle>
                <p className="text-xs uppercase tracking-[0.2em] text-[#675c4e] mb-7">
                  {project.paymentPlan.totalCommitment}% Total · {project.paymentPlan.milestones} Milestones · {project.paymentPlan.plan} Plan
                </p>
                <div className="rounded-2xl border border-[#e8e2da] bg-white px-3 py-9 sm:px-8">
                  <div className="flex">
                    {project.paymentPlan.schedule.map((s, i, arr) => (
                      <div key={i} className="flex-1 flex flex-col items-center relative px-1">
                        {i < arr.length - 1 && <span className="absolute top-6 left-1/2 w-full h-px bg-[#e8e2da]" />}
                        <div className={`relative z-10 h-12 w-12 rounded-full border ${STEP_TONES[i % STEP_TONES.length][0]} ${STEP_TONES[i % STEP_TONES.length][1]} bg-white flex items-center justify-center text-sm font-bold tabular-nums transition-all duration-150 hover:bg-white hover:shadow-[0_4px_16px_-4px_rgba(154,115,85,0.25)]`}>
                          {s.percent}%
                        </div>
                        <span className="mt-3 text-[11px] text-[#574e44] text-center leading-tight max-w-[92px]">{s.label}</span>
                        <span className="mt-1 text-sm font-semibold text-[#2a2520] tabular-nums">{moneyM((project.priceFrom * s.percent) / 100)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Unit Plans — selector + large preview */}
            <section id="floor-plans" className="pt-12 scroll-mt-36">
              <SectionTitle no="04">Unit Plans</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] rounded-2xl border border-[#e8e2da] overflow-hidden bg-white">
                {/* Left: bedroom-type pills */}
                <div className="flex md:flex-col gap-1 p-2 overflow-x-auto no-scrollbar border-b md:border-b-0 md:border-r border-[#e8e2da]">
                  {project.floorPlans.map((f, i) => {
                    const active = i === planIdx;
                    return (
                      <button
                        key={i}
                        onClick={() => setPlanIdx(i)}
                        className={`shrink-0 md:w-full text-left px-4 py-3 rounded-lg md:rounded-none md:border-l-2 transition-all duration-150 ${
                          active ? 'md:border-[#80603f] bg-[#faf7f3] text-[#2a2520]' : 'md:border-transparent text-[#4a4138] hover:bg-[#faf7f3]'
                        }`}
                      >
                        <p className="text-sm font-semibold whitespace-nowrap">{f.name}</p>
                        <p className="text-[11px] text-[#574e44] mt-0.5 whitespace-nowrap">
                          {f.sizeMin && f.sizeMax ? `${f.sizeMin}–${f.sizeMax} sqft` : `${f.size} sqft`}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Right: active plan preview */}
                {(() => {
                  const f = project.floorPlans[planIdx];
                  const planImg = planImageFor(f.name);
                  return (
                    <div className="p-6 md:p-8 flex flex-col">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-[#2a2520]">{f.name}</h3>
                          <p className="text-sm text-[#574e44] mt-1">
                            {f.sizeMin && f.sizeMax ? `${f.sizeMin}–${f.sizeMax} sqft` : `${f.size} sqft`}
                            {f.count ? ` · ${f.count} units available` : ''}
                          </p>
                        </div>
                        {f.priceFrom && <p className="text-lg font-bold text-[#6a4b2e] tabular-nums">from {moneyM(f.priceFrom)}</p>}
                      </div>

                      <div className="mt-5 rounded-xl bg-[#faf7f3] border border-[#e8e2da] flex items-center justify-center p-6 min-h-[300px]">
                        <img key={planIdx} src={planImg} alt={`${f.name} plan`} className="p4-fade max-h-[320px] w-full object-contain" />
                      </div>

                      <button
                        onClick={() => setPlanModal({ img: planImg, title: f.name })}
                        className="mt-5 self-start inline-flex items-center gap-2 border border-[#e8e2da] text-sm font-semibold text-[#80603f] hover:border-[#947049] hover:bg-[#faf7f3] px-5 py-2.5 rounded-lg transition-colors"
                      >
                        <Eye size={15} /> View Full Plan
                      </button>
                    </div>
                  );
                })()}
              </div>
            </section>

            {/* Unit Specifications */}
            <section id="specifications" className="pt-12 scroll-mt-36">
              <SectionTitle no="05">Unit Specifications</SectionTitle>
              <div className="flex h-4 w-full rounded-md overflow-hidden mb-3">
                {project.distribution.map((d, i) => (
                  <div key={i} style={{ width: `${d.percent}%`, backgroundColor: DIST_COLORS[i % DIST_COLORS.length] }} title={`${d.type} ${d.percent}%`} />
                ))}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mb-5 text-xs">
                {project.distribution.map((d, i) => (
                  <span key={i} className={MUTED}>
                    <span className="inline-block h-2.5 w-2.5 rounded-sm mr-1 align-middle" style={{ backgroundColor: DIST_COLORS[i % DIST_COLORS.length] }} />
                    {d.type} {d.percent}%
                  </span>
                ))}
              </div>
              <div className="rounded-xl border border-[#e8e2da] overflow-x-auto no-scrollbar">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`text-left ${LABEL} text-xs uppercase tracking-[0.1em] border-b border-[#e8e2da] bg-[#faf7f3]`}>
                      <th className="px-4 py-3 font-semibold">Beds</th>
                      <th className="px-4 py-3 font-semibold">Sizes (sqft)</th>
                      <th className="px-4 py-3 font-semibold">Avg Price</th>
                      <th className="px-4 py-3 font-semibold">Type</th>
                      <th className="px-4 py-3 font-semibold">Units</th>
                      <th className="px-4 py-3 font-semibold">Availability</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8e2da]">
                    {project.unitTypes.map((u, i) => (
                      <tr key={i} className="hover:bg-[#faf7f3] transition-colors">
                        <td className={`px-4 py-5 text-[15px] font-semibold ${TEXT}`}>{u.beds}</td>
                        <td className={`px-4 py-5 ${BODY}`}>{u.sizeMin}–{u.sizeMax}</td>
                        <td className="px-4 py-5">
                          <div className={`text-[15px] font-bold ${GRAD_TEXT}`}>{money(u.avgPrice)}</div>
                          <div className={`text-xs ${MUTED}`}>{money(u.pricePerSqft)}/sqft</div>
                        </td>
                        <td className={`px-4 py-5 ${BODY}`}>{u.type}</td>
                        <td className={`px-4 py-5 ${BODY}`}>{u.units}</td>
                        <td className="px-4 py-5">
                          <span className="inline-block rounded-full bg-[#ecf6f0] text-[#2e8b57] text-xs font-bold px-3 py-1">{u.available} left</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Amenities */}
            <section className="pt-12">
              <SectionTitle no="06">Amenities</SectionTitle>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.amenities.map((a, i) => {
                  const Icon = amenityIcon(a);
                  return (
                    <div key={i} className="rounded-xl border border-[#e8e2da] px-4 py-4 flex items-center gap-3 hover:border-[#947049] transition-colors">
                      <span className={`${TILE_TONES[i % TILE_TONES.length]} h-9 w-9 rounded-lg flex items-center justify-center text-white shrink-0`}>
                        <Icon size={18} />
                      </span>
                      <span className={`text-sm ${BODY}`}>{a}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Location + metro map */}
            <section id="location" className="pt-12 scroll-mt-36">
              <SectionTitle no="07">Location &amp; Market</SectionTitle>
              <MarketMap />
              <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-3">
                {project.nearby.map((p, i) => {
                  const Icon = nearbyIcon(p.type);
                  return (
                    <div key={i} className="rounded-xl border border-[#e8e2da] px-4 py-3 flex items-center gap-3">
                      <span className="h-9 w-9 rounded-lg bg-[#eef4fa] text-[#2f6fae] flex items-center justify-center shrink-0">
                        <Icon size={18} />
                      </span>
                      <div className="min-w-0">
                        <p className={`text-sm ${BODY} leading-snug`}>{p.name}</p>
                        <p className="text-sm font-bold text-[#80603f] tabular-nums">{p.dist}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* FAQ — numbered ghost list */}
            <section id="faq" className="pt-12 scroll-mt-36">
              <SectionTitle no="08">Frequently Asked Questions</SectionTitle>
              <div className="border-t border-[#e8e2da]">
                {project.faqs.map((f, i) => {
                  const open = faqOpen === i;
                  return (
                    <div key={i} className="border-b border-[#e8e2da]">
                      <button
                        onClick={() => setFaqOpen(open ? -1 : i)}
                        className="group w-full flex items-start gap-4 md:gap-6 py-5 text-left"
                      >
                        <span className={`text-sm font-bold tabular-nums pt-1 ${open ? 'text-[#80603f]' : 'text-[#675c4e]'}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className={`flex-1 text-base md:text-lg font-semibold transition-colors ${open ? 'text-[#80603f]' : `${TEXT} group-hover:text-[#80603f]`}`}>
                          {f.q}
                        </span>
                        <Plus size={20} className={`shrink-0 mt-1 text-[#80603f] transition-transform duration-200 ${open ? 'rotate-45' : ''}`} />
                      </button>
                      <div className={`overflow-hidden transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] ${open ? 'max-h-60' : 'max-h-0'}`}>
                        <p className={`pb-6 pl-9 md:pl-12 text-[15px] ${BODY} leading-[1.8] max-w-2xl`}>{f.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Sticky developer sidebar */}
          <aside className="lg:pt-2">
            <div className="lg:sticky lg:top-40 rounded-2xl border border-[#e8e2da] shadow-sm p-6 bg-white">
              {/* Video tour — placed above the developer */}
              <div id="video" className="mb-5 pb-5 border-b border-[#e8e2da] scroll-mt-24">
                <p className={`text-[10px] uppercase tracking-[0.15em] ${LABEL} mb-2`}>Video Tour</p>
                <div className="rounded-lg overflow-hidden border border-[#e8e2da] aspect-video bg-black">
                  <iframe
                    src={ytEmbed(project.videoUrl)}
                    title={`${project.name} video tour`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className={`${GRAD} h-16 w-16 rounded-xl flex items-center justify-center text-white font-bold text-lg font-[family-name:var(--font-heading)]`}>
                {project.developer.slice(0, 2).toUpperCase()}
              </div>
              <p className={`mt-3 font-semibold ${TEXT}`}>{project.developer}</p>
              <p className={`text-xs uppercase tracking-[0.15em] ${LABEL}`}>Developer</p>

              <div className="mt-5 pt-5 border-t border-[#e8e2da]">
                <p className={`text-[10px] uppercase tracking-[0.15em] ${LABEL}`}>Launch Price ({project.launchPriceDate})</p>
                <p className="mt-1 text-3xl font-bold text-[#6a4b2e] font-[family-name:var(--font-heading)] tabular-nums">{money(project.priceFrom)}</p>
                <p className="mt-1 text-[11px] text-[#675c4e]">Data as of {project.launchPriceDate}</p>
              </div>

              <div className="mt-4 space-y-2.5">
                {[
                  ['Handover', project.handover],
                  ['Avg / Sqft', money(project.avgPricePerSqft)],
                ].map(([k, v], i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className={MUTED}>{k}</span>
                    <span className={`font-semibold ${TEXT} tabular-nums`}>{v}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => openLead()}
                className="bg-[#80603f] mt-5 w-full text-white text-sm font-bold uppercase tracking-[0.1em] py-3 rounded-lg transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#9d7754] hover:shadow-[0_12px_32px_-6px_rgba(128,96,63,0.5)]"
              >
                Register Your Interest
              </button>
              <a href={`${DOCS}/brochure.pdf`} target="_blank" rel="noopener" className="mt-3 flex items-center justify-center gap-1.5 w-full border border-[#e8e2da] text-sm font-semibold text-[#6a4b2e] hover:border-[#947049] hover:bg-[#faf7f3] py-3 rounded-lg transition-colors">
                <Download size={15} /> Download Brochure
              </a>
            </div>
          </aside>
        </div>

        {/* CTA banner */}
        <div className="mt-16 rounded-2xl bg-[#13202f] text-white p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold font-[family-name:var(--font-heading)]">Ready to make your move?</h3>
              <p className="mt-3 text-white/70 max-w-md">You&apos;ve explored {project.name}. Let&apos;s turn insights into action.</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.15em] text-white/60 mb-3">I am interested to</p>
              <div className="grid grid-cols-3 gap-3">
                {[['Buy', 'Properties'], ['Sell', 'List with us'], ['Rent', 'Browse rentals']].map(([x, sub]) => (
                  <button
                    key={x}
                    onClick={() => setLeadIntent(x)}
                    className={`rounded-xl py-3.5 text-center border transition-colors ${
                      leadIntent === x ? 'bg-white/20 border-white/40' : 'bg-white/10 border-transparent hover:bg-white/20'
                    }`}
                  >
                    <span className="block text-sm font-semibold">{x}</span>
                    <span className="block text-[10px] text-white/50 mt-0.5">{sub}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => openLead(leadIntent)}
                className="bg-[#2f6fae] mt-4 w-full py-3 rounded-xl text-sm font-bold uppercase tracking-[0.1em] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#3a7fc4] hover:shadow-[0_12px_32px_-6px_rgba(47,111,174,0.5)]"
              >
                Continue
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-[#e8e2da] px-4 py-3 flex items-center gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#675c4e]">From</p>
          <p className="text-base font-bold text-[#6a4b2e] tabular-nums leading-none">{money(project.priceFrom)}</p>
        </div>
        <button onClick={() => openLead()} className="bg-[#80603f] ml-auto text-white text-sm font-bold uppercase tracking-[0.08em] px-5 py-2.5 rounded-lg hover:bg-[#9d7754]">
          Register Interest
        </button>
      </div>

      {/* Scroll to top */}
      <button
        onClick={scrollTop}
        aria-label="Back to top"
        className={`fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-40 h-11 w-11 rounded-full ${GRAD} text-white shadow-lg flex items-center justify-center transition-transform hover:-translate-y-0.5`}
      >
        <ChevronUp size={20} />
      </button>

      {/* Unit plan modal */}
      {planModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setPlanModal(null)}
        >
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e8e2da]">
              <p className={`font-semibold ${TEXT}`}>
                {planModal.title} <span className={`font-normal ${MUTED}`}>— Unit Plan</span>
              </p>
              <button
                onClick={() => setPlanModal(null)}
                aria-label="Close"
                className="h-8 w-8 rounded-full flex items-center justify-center text-[#574e44] hover:bg-[#f3ede5] transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 bg-[#faf7f3] flex items-center justify-center">
              <img src={planModal.img} alt={`${planModal.title} plan`} className="w-full max-h-[65vh] object-contain" />
            </div>
            <div className="flex justify-end px-5 py-3 border-t border-[#e8e2da]">
              <button
                onClick={() => setPlanModal(null)}
                className="border border-[#e8e2da] text-sm font-semibold text-[#4a4138] hover:bg-[#faf7f3] px-5 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lead capture modal */}
      {leadOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={closeLead}
        >
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e8e2da]">
              <p className={`font-semibold ${TEXT}`}>Register Your Interest</p>
              <button
                onClick={closeLead}
                aria-label="Close"
                className="h-8 w-8 rounded-full flex items-center justify-center text-[#574e44] hover:bg-[#f3ede5] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {leadSent ? (
              <div className="px-6 py-10 text-center">
                <span className="mx-auto h-14 w-14 rounded-full bg-[#80603f]/12 text-[#6a4b2e] flex items-center justify-center">
                  <Check size={28} />
                </span>
                <p className={`mt-4 text-lg font-bold ${TEXT} font-[family-name:var(--font-heading)]`}>Thank you!</p>
                <p className={`mt-1 text-sm ${MUTED}`}>Our team will contact you shortly about {project.name}.</p>
                <button onClick={closeLead} className={`${GRAD} mt-6 px-6 py-2.5 rounded-lg text-white text-sm font-bold`}>Done</button>
              </div>
            ) : (
              <form onSubmit={submitLead} className="p-6 space-y-4">
                <p className={`text-sm ${MUTED}`}>
                  Interested in <span className="font-semibold text-[#6a4b2e]">{project.name}</span>. Leave your details and we&apos;ll reach out.
                </p>

                <div>
                  <label className={`block text-xs font-semibold ${MUTED} mb-1.5`}>I am interested to</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Buy', 'Sell', 'Rent'].map((x) => (
                      <button
                        type="button"
                        key={x}
                        onClick={() => setLeadIntent(x)}
                        className={`py-2 rounded-lg text-sm font-semibold border transition-colors ${
                          leadIntent === x ? `${GRAD} text-white border-transparent` : 'border-[#e8e2da] text-[#4a4138] hover:border-[#947049]'
                        }`}
                      >
                        {x}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-semibold ${MUTED} mb-1.5`}>Full Name</label>
                  <input required type="text" value={lead.name} onChange={(e) => setLead((s) => ({ ...s, name: e.target.value }))} placeholder="Your name" className={INPUT} />
                </div>
                <div>
                  <label className={`block text-xs font-semibold ${MUTED} mb-1.5`}>Phone Number</label>
                  <input required type="tel" value={lead.phone} onChange={(e) => setLead((s) => ({ ...s, phone: e.target.value }))} placeholder="+971 50 000 0000" className={INPUT} />
                </div>
                <div>
                  <label className={`block text-xs font-semibold ${MUTED} mb-1.5`}>Email</label>
                  <input required type="email" value={lead.email} onChange={(e) => setLead((s) => ({ ...s, email: e.target.value }))} placeholder="you@email.com" className={INPUT} />
                </div>

                <button
                  type="submit"
                  className={`${GRAD} w-full py-3 rounded-lg text-white text-sm font-bold uppercase tracking-[0.08em] transition-transform hover:-translate-y-0.5`}
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SectionTitle({ no, children }) {
  return (
    <div className="mb-8">
      {no && (
        <span className="block text-[13px] font-black tracking-[0.2em] text-[#80603f] mb-1.5">
          {no} —
        </span>
      )}
      <h2 className="text-[28px] font-bold font-[family-name:var(--font-heading)] text-[#2a2520]">{children}</h2>
    </div>
  );
}

function Stat({ label, value, highlight, tone }) {
  const tones = {
    green: { box: 'border-[#cfe5d8] bg-[#ecf6f0]', text: 'text-[#2e8b57]' },
    blue: { box: 'border-[#cfdfee] bg-[#eef4fa]', text: 'text-[#2f6fae]' },
    red: { box: 'border-[#ecd4d4] bg-[#faeeee]', text: 'text-[#b35454]' },
    violet: { box: 'border-[#dcd7ee] bg-[#f1effa]', text: 'text-[#6b5b95]' },
  };
  const t = tones[tone] || { box: 'border-[#e3d3bf] bg-[#faf7f3]', text: 'text-[#6a4b2e]' };
  return (
    <div
      className={`rounded-xl border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_-8px_rgba(154,115,85,0.4)] ${
        highlight ? t.box : 'border-[#e8e2da] hover:border-[#947049]'
      }`}
    >
      <p className="text-[10px] uppercase tracking-[0.12em] text-[#675c4e]">{label}</p>
      <p className={`mt-1.5 font-bold tabular-nums ${highlight ? 'text-2xl' : 'text-lg'} ${tone ? t.text : highlight ? t.text : 'text-[#2a2520]'}`}>{value}</p>
    </div>
  );
}
