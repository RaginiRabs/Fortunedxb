'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import { useTheme } from '@mui/material';
import Link from 'next/link';
import s from './seller.module.css';

const STEPS = [
  { id: 'seller_info',    name: 'Your Details' },
  { id: 'property_type',  name: 'Property Category' },
  { id: 'listing_type',   name: 'Listing Status' },
  { id: 'property_stage', name: 'Stage' },
  { id: 'sell_intent',    name: 'Selling Objective' },
  { id: 'pricing',        name: 'Pricing & Demand' },
  { id: 'property_info',  name: 'Property Details' },
  { id: 'review',         name: 'Review & Submit' },
];

// [code, label, minDigits, maxDigits, placeholder]
// Digit counts are national-number length (without country code).
const CODES = [
  ['+971', 'UAE +971',           9,  9,  '50 123 4567'],
  ['+91',  'India +91',          10, 10, '98765 43210'],
  ['+44',  'UK +44',              10, 10, '7700 900123'],
  ['+1',   'USA +1',              10, 10, '202 555 0123'],
  ['+966', 'Saudi Arabia +966',   9,  9,  '51 234 5678'],
  ['+974', 'Qatar +974',          8,  8,  '3312 3456'],
  ['+973', 'Bahrain +973',        8,  8,  '3600 1234'],
  ['+968', 'Oman +968',           8,  8,  '9212 3456'],
  ['+965', 'Kuwait +965',         8,  8,  '500 12345'],
  ['+92',  'Pakistan +92',        10, 10, '300 1234567'],
  ['+880', 'Bangladesh +880',     10, 10, '1712 345678'],
  ['+94',  'Sri Lanka +94',       9,  9,  '71 234 5678'],
  ['+20',  'Egypt +20',           10, 10, '100 123 4567'],
  ['+962', 'Jordan +962',         9,  9,  '79 123 4567'],
  ['+961', 'Lebanon +961',        7,  8,  '71 234 567'],
  ['+90',  'Turkey +90',          10, 10, '532 123 4567'],
  ['+7',   'Russia +7',           10, 10, '912 345 6789'],
  ['+86',  'China +86',           11, 11, '131 2345 6789'],
  ['+65',  'Singapore +65',       8,  8,  '8123 4567'],
  ['+61',  'Australia +61',       9,  9,  '412 345 678'],
  ['+33',  'France +33',          9,  9,  '612 345 678'],
  ['+49',  'Germany +49',         10, 11, '151 2345678'],
  ['+27',  'South Africa +27',    9,  9,  '71 123 4567'],
  ['+81',  'Japan +81',           10, 10, '90 1234 5678'],
];

// Lookup helper — returns { min, max, placeholder, label } for a given code
const PHONE_META = CODES.reduce((acc, [code, label, min, max, placeholder]) => {
  acc[code] = { min, max, placeholder, label };
  return acc;
}, {});

function getPhoneMeta(code) {
  return PHONE_META[code] || { min: 6, max: 15, placeholder: 'Phone number', label: '' };
}

const INIT = {
  full_name:'', email:'', phone_code:'+971', phone:'', nationality:'',
  property_type:'', listing_type:'',
  offplan_stage:'', ready_occupancy:'',
  sell_intent:'',
  original_price:'', asking_price:'',
  project_name:'', developer_name:'', project_location:'',
  area_sqft:'', bedrooms:'', bathrooms:'', floor_no:'', notes:'',
};

/* ─── HELPERS ────────────────────────────────────── */
function toAEDWords(val) {
  const n = parseFloat(val);
  if (!val || isNaN(n) || n <= 0) return '';
  if (n >= 1e9) { const b = n / 1e9; return (Number.isInteger(b) ? b : b.toFixed(2)) + ' Billion AED'; }
  if (n >= 1e6) { const m = n / 1e6; return (Number.isInteger(m) ? m : parseFloat(m.toFixed(2))) + ' Million AED'; }
  if (n >= 1e3) { const k = n / 1e3; return (Number.isInteger(k) ? k : parseFloat(k.toFixed(1))) + ' Thousand AED'; }
  return n.toLocaleString() + ' AED';
}

function calcSpeed(S) {
  const op = parseFloat(S.original_price) || 0;
  const ask = parseFloat(S.asking_price) || 0;
  if (!op || !ask) return null;
  const pct = ((ask - op) / op) * 100;
  let sc = pct <= 0 ? 98 : pct <= 5 ? 90 : pct <= 10 ? 76 : pct <= 15 ? 62 : pct <= 20 ? 48 : pct <= 30 ? 33 : pct <= 50 ? 18 : 8;
  if (S.listing_type === 'ready') sc = Math.min(100, sc + 8);
  if (S.sell_intent === 'distress') sc = Math.min(100, sc + 10);
  if (S.offplan_stage === 'nearing_possession') sc = Math.min(100, sc + 5);
  if (S.offplan_stage === 'recently_bought') sc = Math.max(sc - 5, 5);
  if (S.ready_occupancy === 'vacant') sc = Math.min(100, sc + 6);
  if (S.ready_occupancy === 'preleased') sc = Math.min(100, sc + 4);
  let lbl, cls;
  if (sc >= 85) { lbl = 'High Market Demand'; cls = 'fast'; }
  else if (sc >= 65) { lbl = 'Strong Buyer Interest'; cls = 'fast'; }
  else if (sc >= 44) { lbl = 'Active Market'; cls = 'med'; }
  else if (sc >= 24) { lbl = 'Moderate Liquidity'; cls = 'slow'; }
  else { lbl = 'Niche Premium Segment'; cls = 'slow'; }
  return { pct: pct.toFixed(1), sc, lbl, cls };
}

function getInsight(r, S) {
  if (!r) return '';
  const p = parseFloat(r.pct), ready = S.listing_type === 'ready';
  if (p <= 0) return <>Priced at or below acquisition cost — <span className={s.hi}>maximum market appeal.</span> Properties at this level typically attract offers within days.</>;
  if (p <= 5) return <>A {r.pct}% differential is highly competitive for Dubai. {ready ? <span className={s.hi}>Ready-to-move units here rarely remain available beyond a week.</span> : 'Off-plan stock at this margin attracts investor attention quickly.'}</>;
  if (p <= 10) return <>At <span className={s.hi}>{r.pct}% above acquisition cost,</span> this is a strong entry proposition. {ready ? 'Expect serious enquiries within one to two weeks.' : 'Nearing-possession off-plan at this premium performs well.'}</>;
  if (p <= 20) return <>A <span className={s.hi}>{r.pct}% appreciation ask</span> is consistent with market movement. {ready ? 'Well-located ready units typically close in four to six weeks.' : 'Qualified investors will engage once financing is confirmed.'}</>;
  if (p <= 30) return <>At <span className={s.hi}>{r.pct}% above cost,</span> this targets high-net-worth buyers with longer decision cycles. Allow one to three months for the right offer.</>;
  return <>A <span className={s.hi}>{r.pct}% premium</span> places this in the ultra-premium segment. We recommend building in negotiation room to support a timely close.</>;
}

/* ─── SUB COMPONENTS ─────────────────────────────── */

function Toast({ toast, onClose }) {
  if (!toast) return null;

  const palette = {
    success: { bg: '#F0FDF4', border: '#86EFAC', accent: '#15803D', icon: '#15803D' },
    error:   { bg: '#FEF2F2', border: '#FCA5A5', accent: '#991B1B', icon: '#B91C1C' },
    info:    { bg: '#F0F9FF', border: '#93C5FD', accent: '#1E40AF', icon: '#1D4ED8' },
  };
  const c = palette[toast.type] || palette.info;

  const iconPath =
    toast.type === 'success'
      ? <path d="M4 9.5L7.5 13L14 6" stroke={c.icon} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      : toast.type === 'error'
        ? <><circle cx="9" cy="9" r="7.25" stroke={c.icon} strokeWidth="1.4" fill="none"/><path d="M9 5.5V9.5M9 12.2V12.4" stroke={c.icon} strokeWidth="1.6" strokeLinecap="round"/></>
        : <><circle cx="9" cy="9" r="7.25" stroke={c.icon} strokeWidth="1.4" fill="none"/><path d="M9 8.5V12.5M9 5.6V5.8" stroke={c.icon} strokeWidth="1.6" strokeLinecap="round"/></>;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        top: 24,
        right: 24,
        zIndex: 9999,
        maxWidth: 380,
        minWidth: 260,
        padding: '14px 16px',
        paddingRight: 40,
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderLeft: `3px solid ${c.icon}`,
        borderRadius: 8,
        boxShadow: '0 6px 24px rgba(15, 23, 42, 0.12)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        animation: 'fdxToastIn 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" style={{ flexShrink: 0, marginTop: 1 }}>
        {iconPath}
      </svg>
      <div style={{ flex: 1, fontSize: 13, lineHeight: 1.6, color: c.accent, fontWeight: 500 }}>
        {toast.message}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close notification"
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 4,
          color: c.accent,
          opacity: 0.55,
          lineHeight: 0,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12">
          <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </button>
      <style jsx>{`
        @keyframes fdxToastIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

function OC({ label, sub, selected, onClick }) {
  return (
    <div className={`${s.oc} ${selected ? s.ocSel : ''}`} onClick={onClick}>
      <div className={s.ocLbl}>{label}</div>
      {sub && <div className={s.ocSub}>{sub}</div>}
    </div>
  );
}

function BtnRow({ back, onPrev, onNext }) {
  return (
    <div className={s.brow}>
      {back ? <button className={`${s.btn} ${s.btnBk}`} onClick={onPrev}>Back</button> : <div />}
      <button className={`${s.btn} ${s.btnP}`} onClick={onNext}>Continue</button>
    </div>
  );
}

function RR({ k, v, gold }) {
  const theme = useTheme();
  return (
    <div className={s.rr}>
      <span className={s.rk}>{k}</span>
      <span className={s.rv} style={gold ? { color: theme.palette.gold.main } : undefined}>{v || '—'}</span>
    </div>
  );
}

function Topbar() {
  return (
    <div className={s.topbar}>
      <Link href="/" className={s.logo}>
        <img src="/asset/logo.png" alt="Fortune DXB" className={s.logoImg} />
      </Link>
    </div>
  );
}

function ProgressDots({ cur, total }) {
  return (
    <div className={s.progress}>
      <div className={s.progDots}>
        {Array.from({ length: total }, (_, i) => (
          <div key={i} className={`${s.progDot} ${i < cur ? s.progDotDone : i === cur ? s.progDotActive : ''}`} />
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className={s.footer}>
      <div className={s.footerTrust}>
        <span className={s.footerTrustItem}><span className={s.footerDot} />RERA Licensed Brokerage</span>
        <span className={s.footerTrustItem}><span className={s.footerDot} />AED 3.2B+ Transactions</span>
        <span className={s.footerTrustItem}><span className={s.footerDot} />40+ Buyer Markets</span>
        <span className={s.footerTrustItem}><span className={s.footerDot} />98% Client Satisfaction</span>
      </div>
      <div className={s.footerMeta}>
        Dubai, UAE &nbsp;·&nbsp;
        <Link href="/" className={s.footerLink}>fortunedxb.com</Link>
      </div>
    </div>
  );
}

/* ─── TESTIMONIALS ──────────────────────────────────── */
const TESTIMONIALS = [
  { name: 'Tasneem',        img: 'tasneem.png', text: 'I invested in Danube Opalz through Fortune Realty LLC with Batul’s guidance, and it has been one of the best decisions I’ve made. The entire process was smooth, transparent, and professionally handled. I’ve now received the handover of my property, and I’m earning an impressive 11% yearly rental return. Batul and the Fortune Realty team truly understand how to match clients with profitable opportunities. Highly recommended for anyone looking to invest in Dubai real estate.' },
  { name: 'Raghav',         img: '',  text: 'I had a wonderful experience working with Hazar from Fortune Realty. She not only helped me successfully sell my property but also guided me in finding a new property with great ROI potential. Her dedication, professionalism, and constant efforts truly stood out throughout the entire process. I sincerely appreciate the excellence and hard work she put in to achieve the best possible results for me. Highly recommended!' },
  { name: 'Anuj Sharma, USA', img: '',  text: 'Buying my property in Sobha Solis through Bilal at Fortune Realty was an amazing experience. From our very first meeting, it never felt like I was dealing with an agent — it felt like I had found a brother in Dubai. Bilal was genuine, supportive, and guided me with complete transparency throughout the entire booking and transaction journey. Everything was smooth, stress-free, and professionally managed. I truly appreciate the experience and highly recommend Bilal and Fortune Realty to anyone looking to invest in Dubai real estate.' },
  { name: 'Nilofer',        img: 'nilofer.png', text: 'I had an excellent experience selling my 2-bedroom apartment in Al Furjan with Fortune Realty. Their team was extremely prompt in response, professional, and supportive throughout the entire process. Within just 25 days, they successfully sold my property for AED 1.6 million — exactly the price I was expecting. Kudos to Bilal and the entire Fortune Realty team for their outstanding service and results. I highly recommend them for anyone looking to sell property in Dubai.' },
  { name: 'Sakina',         img: 'sakina.png',  text: 'I bought my property through Batul from Fortune Realty LLC, and the experience was excellent from start to finish. Their team was very professional, always prompt with follow-ups, and guided me through every step of the process. Most importantly, they helped me secure the best deal possible. I highly recommend Batul and entire team of Fortune Realty LLC to anyone looking to buy property with confidence and ease.' },
];

function getInitials(name) {
  const clean = String(name || '').split(',')[0].trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function TestimonialsSection() {
  const theme = useTheme();
  const trackRef = useRef(null);
  const [expanded, setExpanded] = useState({});
  const [failedImgs, setFailedImgs] = useState(() => new Set());

  const toggleExpand = (i) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }));
  const markFailed = (i) => setFailedImgs(prev => {
    const next = new Set(prev);
    next.add(i);
    return next;
  });

  const scroll = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(`.${s.testCard}`);
    const gap = 20;
    const delta = (card?.clientWidth || 300) + gap;
    track.scrollBy({ left: dir * delta, behavior: 'smooth' });
  };

  return (
    <div className={s.testSection}>
      <div className={s.testHeader}>
        <span className={s.testEyebrow}>What our sellers say</span>
        <div className={s.testTitle}>Trusted by property owners<br />across the globe</div>
      </div>

      <div className={s.testCarousel}>
        <button
          type="button"
          className={`${s.testArrow} ${s.testArrowLeft}`}
          onClick={() => scroll(-1)}
          aria-label="Previous testimonial"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 3L5 7L9 11" stroke={theme.palette.gold.main} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className={s.testTrack} ref={trackRef}>
          {TESTIMONIALS.map((t, i) => (
            <div className={s.testCard} key={i}>
              <div className={s.testAuthor}>
                {failedImgs.has(i) || !t.img ? (
                  <div className={s.testAvatarFallback} aria-label={t.name}>
                    {getInitials(t.name)}
                  </div>
                ) : (
                  <img
                    className={s.testAvatar}
                    src={`/asset/testimonials/${t.img}`}
                    alt={t.name}
                    loading="lazy"
                    onError={() => markFailed(i)}
                  />
                )}
                <div className={s.testInfo}>
                  <div className={s.testName}>{t.name}</div>
                  <div className={s.testStars}>
                    {[0, 1, 2, 3, 4].map(si => <div key={si} className={s.testStar} />)}
                  </div>
                </div>
              </div>
              <div className={s.testQuoteMark}>&ldquo;</div>
              <div className={`${s.testText} ${expanded[i] ? s.testTextExpanded : ''}`}>{t.text}</div>
              <button
                type="button"
                className={s.testToggle}
                onClick={() => toggleExpand(i)}
                aria-expanded={!!expanded[i]}
              >
                {expanded[i] ? 'Read less' : 'Read more'}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: expanded[i] ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          className={`${s.testArrow} ${s.testArrowRight}`}
          onClick={() => scroll(1)}
          aria-label="Next testimonial"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3L9 7L5 11" stroke={theme.palette.gold.main} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

    </div>
  );
}

/* ─── OTP SCREEN ─────────────────────────────────── */
function OTPScreen({ email, name, onVerified, onToast }) {
  const theme = useTheme();
  const [otp, setOtp] = useState(['','','','','','']);
  const [err, setErr] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0); // seconds remaining before resend allowed
  const refs = useRef([]);

  // Start a 30s cooldown as soon as we land on this screen
  // (because the form already triggered send-otp right before routing here)
  useEffect(() => {
    setCooldown(30);
  }, []);

  // Tick the cooldown counter down each second
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => {
      setCooldown((c) => (c <= 1 ? 0 : c - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const handleChange = (i, val) => {
    const v = val.replace(/[^0-9]/g, '').slice(-1);
    const next = [...otp]; next[i] = v; setOtp(next); setErr('');
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKey = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const digits = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 6).split('');
    const next = [...otp];
    digits.forEach((d, i) => { next[i] = d; });
    setOtp(next);
    refs.current[Math.min(digits.length, 5)]?.focus();
  };

  const verify = async () => {
    const code = otp.join('');
    if (code.length < 6) { setErr('Please enter the complete 6-digit code.'); return; }
    setVerifying(true);
    try {
      const res = await fetch('/api/seller-leads/verify-otp', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: code }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        const msg = data?.message || 'Incorrect code. Please try again.';
        setErr(msg);
        setVerifying(false);
        return;
      }
    } catch {
      setErr('Network error. Please try again.');
      setVerifying(false);
      return;
    }
    onVerified();
  };

  const resend = async () => {
    if (resending || cooldown > 0) return;
    setResending(true);
    setErr('');
    try {
      const res = await fetch('/api/seller-leads/send-otp', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        const msg = data?.message || 'Could not resend the code. Please try again.';
        onToast?.('error', msg);
        // If the server tells us to wait (429), start a cooldown based on that
        if (res.status === 429) setCooldown(30);
      } else {
        onToast?.('success', `New code sent to ${email}`);
        setOtp(['','','','','','']);
        refs.current[0]?.focus();
        setCooldown(30);
      }
    } catch {
      onToast?.('error', 'Network error while resending. Please try again.');
    } finally {
      setResending(false);
    }
  };

  const canResend = !resending && cooldown === 0;

  return (
    <div className={s.otpWrap}>
      <div className={s.otpIcon}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M3 7.5C3 6.4 3.9 5.5 5 5.5H17C18.1 5.5 19 6.4 19 7.5V15.5C19 16.6 18.1 17.5 17 17.5H5C3.9 17.5 3 16.6 3 15.5V7.5Z" stroke={theme.palette.gold.main} strokeWidth="1.4" fill="none"/>
          <path d="M3 8L11 12.5L19 8" stroke={theme.palette.gold.main} strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </div>
      <div className={s.otpTitle}>Verify your email</div>
      <div className={s.otpSubText}>We&apos;ve sent a 6-digit code to<br/><strong>{email}</strong></div>
      <div className={s.otpBoxes}>
        {otp.map((v, i) => (
          <input key={i} ref={el => refs.current[i] = el} className={`${s.otpBox} ${v ? s.otpBoxFilled : ''} ${err && !v ? s.otpBoxErr : ''}`}
            type="text" inputMode="numeric" maxLength={1} value={v}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKey(i, e)}
            onPaste={i === 0 ? handlePaste : undefined}
            autoFocus={i === 0}
          />
        ))}
      </div>
      <div className={s.otpErr}>{err}</div>
      <button className={`${s.btn} ${s.btnP} ${verifying ? s.btnDisabled : ''}`}
        style={{ width: '100%', maxWidth: '100%', marginTop: 4 }}
        onClick={verify} disabled={verifying}>
        {verifying ? <><span className={s.spin} />Verifying</> : 'Verify & Submit'}
      </button>
      <div className={s.otpResend}>
        Didn&apos;t receive it?
        <button
          onClick={resend}
          disabled={!canResend}
          style={!canResend ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
        >
          {resending
            ? 'Sending…'
            : cooldown > 0
              ? `Resend in ${cooldown}s`
              : 'Resend code'}
        </button>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────── */
export default function SellerPage() {
  const theme = useTheme();
  const [cur, setCur] = useState(0);
  const [form, setForm] = useState(INIT);
  const [errors, setErrors] = useState({});
  const [screen, setScreen] = useState('form'); // form | otp | submitting | success
  const [oqoodFile, setOqoodFile] = useState(null);
  const [toast, setToast] = useState(null); // { type: 'error'|'success'|'info', message }
  const refCode = useRef('FDX-' + Date.now().toString(36).toUpperCase());
  const cardRef = useRef(null);

  // Auto-dismiss toast after 5s
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  const showToast = useCallback((type, message) => setToast({ type, message }), []);

  const step = STEPS[cur];

  const upd = useCallback((field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
    setErrors(prev => ({ ...prev, [field]: false }));
  }, []);

  const pick = useCallback((field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
    setErrors(prev => ({ ...prev, [field]: false }));
  }, []);

  // Phone input: strip non-digits, clamp to selected country's max length
  const onPhoneDigitsChange = useCallback((raw) => {
    setForm(prev => {
      const meta = getPhoneMeta(prev.phone_code);
      const digits = String(raw || '').replace(/\D/g, '').slice(0, meta.max);
      return { ...prev, phone: digits };
    });
    setErrors(prev => ({ ...prev, phone: false }));
  }, []);

  // Country code switch: retrim existing number to new country's max length
  const onPhoneCodeChange = useCallback((newCode) => {
    setForm(prev => {
      const meta = getPhoneMeta(newCode);
      return {
        ...prev,
        phone_code: newCode,
        phone: String(prev.phone || '').replace(/\D/g, '').slice(0, meta.max),
      };
    });
    setErrors(prev => ({ ...prev, phone: false }));
  }, []);

  const validate = () => {
    const id = step.id;
    const e = {};
    if (id === 'seller_info') {
      if (!form.full_name.trim() || form.full_name.trim().length < 2) e.full_name = true;

      // Stricter email regex — RFC-5322 inspired, practical subset
      const emailRe = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!form.email.trim() || !emailRe.test(form.email.trim())) e.email = true;

      // Phone length against selected country
      const meta = getPhoneMeta(form.phone_code);
      const digits = String(form.phone || '').replace(/\D/g, '');
      if (!digits) {
        e.phone = true;
      } else if (digits.length < meta.min || digits.length > meta.max) {
        e.phone = 'short';
      }
    }
    if (id === 'property_type' && !form.property_type) e.property_type = true;
    if (id === 'listing_type' && !form.listing_type) e.listing_type = true;
    if (id === 'property_stage') {
      if (form.listing_type === 'off_plan' && !form.offplan_stage) e.offplan_stage = true;
      if (form.listing_type === 'ready' && !form.ready_occupancy) e.ready_occupancy = true;
    }
    if (id === 'sell_intent' && !form.sell_intent) e.sell_intent = true;
    if (id === 'pricing') {
      if (!form.original_price) e.original_price = true;
      if (!form.asking_price) e.asking_price = true;
    }
    if (id === 'property_info') {
      if (!form.project_name.trim()) e.project_name = true;
      if (!form.project_location.trim()) e.project_location = true;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate() && cur < STEPS.length - 1) setCur(cur + 1); };
  const prev = () => { if (cur > 0) setCur(cur - 1); };

  const doSubmit = async () => {
    setScreen('otp');
    try {
      const res = await fetch('/api/seller-leads/send-otp', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, name: form.full_name.split(' ')[0] }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        showToast('error', data.message || 'Could not send verification code. Please try again.');
      } else {
        showToast('success', `Verification code sent to ${form.email}`);
      }
    } catch {
      showToast('error', 'Network error. Please check your connection and try again.');
    }
  };

  const finalSubmit = async () => {
    setScreen('submitting');

    try {
      const speedNow = calcSpeed(form);
      const fd = new FormData();

      // Seller info
      fd.append('ref_code', refCode.current);
      fd.append('full_name', form.full_name);
      fd.append('email', form.email);
      fd.append('phone', form.phone);
      fd.append('phone_ccode', form.phone_code);
      fd.append('nationality', form.nationality || '');

      // Property classification
      fd.append('property_type', form.property_type || '');
      fd.append('listing_type', form.listing_type || '');
      fd.append('offplan_stage', form.offplan_stage || '');
      fd.append('ready_occupancy', form.ready_occupancy || '');
      fd.append('sell_intent', form.sell_intent || '');

      // Pricing
      fd.append('original_price', form.original_price || '');
      fd.append('asking_price', form.asking_price || '');
      fd.append('demand_estimate', speedNow?.lbl || '');

      // Property details
      fd.append('project_name', form.project_name || '');
      fd.append('developer_name', form.developer_name || '');
      fd.append('location', form.project_location || '');
      fd.append('area_sqft', form.area_sqft || '');
      fd.append('bedrooms', form.bedrooms || '');
      fd.append('bathrooms', form.bathrooms || '');
      fd.append('floor_no', form.floor_no || '');
      fd.append('notes', form.notes || '');
      fd.append('lead_source', 'seller_page');

      // Optional PDF
      if (oqoodFile) {
        fd.append('oqood_file', oqoodFile);
      }

      const res = await fetch('/api/seller-leads', { method: 'POST', body: fd });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit your listing. Please try again.');
      }

      setScreen('success');
    } catch (err) {
      showToast('error', err.message || 'Something went wrong. Please try again.');
      setScreen('otp');
    }
  };

  // Scroll the card into view on step change — not the entire page.
  // This avoids the "jump to top past the hero" annoyance on desktop
  // and the "content shakes up then I have to scroll" feel on mobile.
  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.top < window.innerHeight * 0.4;
      if (!isVisible) {
        cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [cur, screen]);

  const speed = calcSpeed(form);
  const op = parseFloat(form.original_price) || 0;
  const ask = parseFloat(form.asking_price) || 0;
  const priceDiff = op && ask ? ((ask - op) / op) * 100 : null;

  const TM = { apartment:'Apartment', townhouse:'Townhouse', villa:'Villa', luxury_villa:'Luxury Villa' };
  const SM = { delivering_2yr:'Delivery 2+ Years', nearing_possession:'Nearing Possession', recently_bought:'Recently Acquired' };
  const OM = { vacant:'Vacant', preleased:'Tenanted', new_handover:'Newly Handed Over', upcoming_handover:'Handover Imminent' };
  const IM = { distress:'Urgent Exit', capital_gain:'Capital Gain' };
  const fa = v => v ? 'AED ' + Number(v).toLocaleString() : '—';

  /* ── Step renders ── */
  const renderStep = () => {
    const id = step.id;

    if (id === 'seller_info') return (
      <div className={s.si} key={id}>
        <div className={s.sTitle}>Your details</div>
        <div className={s.sSub}>A few details so our specialist can reach you directly.</div>
        <div className={`${s.field} ${errors.full_name ? s.fieldErr : ''}`}>
          <label className={s.fieldLabel}>Full Name <span className={s.req}>*</span></label>
          <input className={s.fieldInput} placeholder="Full name" value={form.full_name} onChange={e => upd('full_name', e.target.value)} />
          <div className={s.emsg}>Please enter your full name</div>
        </div>
        <div className={s.frow}>
          <div className={`${s.field} ${errors.email ? s.fieldErr : ''}`}>
            <label className={s.fieldLabel}>Email Address <span className={s.req}>*</span></label>
            <input className={s.fieldInput} type="email" placeholder="email@domain.com" value={form.email} onChange={e => upd('email', e.target.value)} />
            <div className={s.emsg}>Enter a valid email address</div>
          </div>
          <div className={s.field}>
            <label className={s.fieldLabel}>Nationality</label>
            <input className={s.fieldInput} placeholder="e.g. Indian, British" value={form.nationality} onChange={e => upd('nationality', e.target.value)} />
          </div>
        </div>
        <div className={`${s.field} ${errors.phone ? s.fieldErr : ''}`}>
          <label className={s.fieldLabel}>WhatsApp / Phone <span className={s.req}>*</span></label>
          <div className={s.phWrap}>
            <select
              className={`${s.fieldSelect} ${s.phSelect}`}
              value={form.phone_code}
              onChange={e => onPhoneCodeChange(e.target.value)}
            >
              {CODES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            <input
              className={`${s.fieldInput} ${s.phInput}`}
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={getPhoneMeta(form.phone_code).max}
              placeholder={getPhoneMeta(form.phone_code).placeholder}
              value={form.phone}
              onChange={e => onPhoneDigitsChange(e.target.value)}
            />
          </div>
          <div className={s.emsg}>
            {errors.phone === 'short'
              ? `Phone must be ${getPhoneMeta(form.phone_code).min === getPhoneMeta(form.phone_code).max
                  ? getPhoneMeta(form.phone_code).max
                  : `${getPhoneMeta(form.phone_code).min}–${getPhoneMeta(form.phone_code).max}`} digits for ${getPhoneMeta(form.phone_code).label.replace(/\s*\+\d+$/, '')}`
              : 'Please enter your phone number'}
          </div>
        </div>
        <BtnRow back={false} onNext={next} />
      </div>
    );

    if (id === 'property_type') return (
      <div className={s.si} key={id}>
        <div className={s.sTitle}>Property category</div>
        <div className={s.sSub}>Select the category that best describes what you are selling.</div>
        <div className={`${s.og} ${s.og2}`}>
          <OC label="Apartment" sub="Studio through 5-bedroom units" selected={form.property_type==='apartment'} onClick={() => pick('property_type','apartment')} />
          <OC label="Townhouse" sub="Gated community living" selected={form.property_type==='townhouse'} onClick={() => pick('property_type','townhouse')} />
          <OC label="Villa" sub="Private pool and garden" selected={form.property_type==='villa'} onClick={() => pick('property_type','villa')} />
          <OC label="Luxury Villa" sub="Ultra-premium estate property" selected={form.property_type==='luxury_villa'} onClick={() => pick('property_type','luxury_villa')} />
        </div>
        <div className={`${s.oerr} ${errors.property_type ? s.oerrShow : ''}`}>Please select a property category</div>
        <BtnRow back onPrev={prev} onNext={next} />
      </div>
    );

    if (id === 'listing_type') return (
      <div className={s.si} key={id}>
        <div className={s.sTitle}>Listing status</div>
        <div className={s.sSub}>This determines how we position your listing and calibrate the demand estimate.</div>
        <div className={`${s.og} ${s.og2}`}>
          <OC label="Off-Plan" sub="Under construction or pre-handover" selected={form.listing_type==='off_plan'} onClick={() => pick('listing_type','off_plan')} />
          <OC label="Ready to Move In" sub="Completed and fully handed over" selected={form.listing_type==='ready'} onClick={() => pick('listing_type','ready')} />
        </div>
        <div className={`${s.oerr} ${errors.listing_type ? s.oerrShow : ''}`}>Please select a listing status</div>
        <BtnRow back onPrev={prev} onNext={next} />
      </div>
    );

    if (id === 'property_stage') {
      if (form.listing_type === 'off_plan') return (
        <div className={s.si} key={id}>
          <div className={s.sTitle}>Delivery stage</div>
          <div className={s.sSub}>The timeline helps buyers plan financing and market entry.</div>
          <div className={`${s.og} ${s.og3}`}>
            <OC label="2+ Years Away" sub="Delivery is over two years out" selected={form.offplan_stage==='delivering_2yr'} onClick={() => pick('offplan_stage','delivering_2yr')} />
            <OC label="Nearing Possession" sub="6 to 18 months remaining" selected={form.offplan_stage==='nearing_possession'} onClick={() => pick('offplan_stage','nearing_possession')} />
            <OC label="Recently Acquired" sub="Re-selling a recent purchase" selected={form.offplan_stage==='recently_bought'} onClick={() => pick('offplan_stage','recently_bought')} />
          </div>
          <div className={`${s.oerr} ${errors.offplan_stage ? s.oerrShow : ''}`}>Please select a delivery stage</div>
          <BtnRow back onPrev={prev} onNext={next} />
        </div>
      );
      return (
        <div className={s.si} key={id}>
          <div className={s.sTitle}>Occupancy status</div>
          <div className={s.sSub}>Current occupancy helps buyers plan their entry strategy.</div>
          <div className={`${s.og} ${s.og4}`}>
            <OC label="Vacant" sub="Empty and immediately available" selected={form.ready_occupancy==='vacant'} onClick={() => pick('ready_occupancy','vacant')} />
            <OC label="Tenanted" sub="Active rental income in place" selected={form.ready_occupancy==='preleased'} onClick={() => pick('ready_occupancy','preleased')} />
            <OC label="Newly Handed Over" sub="Recently received from developer" selected={form.ready_occupancy==='new_handover'} onClick={() => pick('ready_occupancy','new_handover')} />
            <OC label="Handover Imminent" sub="Within the next one to three months" selected={form.ready_occupancy==='upcoming_handover'} onClick={() => pick('ready_occupancy','upcoming_handover')} />
          </div>
          <div className={`${s.oerr} ${errors.ready_occupancy ? s.oerrShow : ''}`}>Please select an occupancy status</div>
          <BtnRow back onPrev={prev} onNext={next} />
        </div>
      );
    }

    if (id === 'sell_intent') return (
      <div className={s.si} key={id}>
        <div className={s.sTitle}>Selling objective</div>
        <div className={s.sSub}>Your objective shapes the buyer profile we target on your behalf.</div>
        <div className={`${s.og} ${s.og2}`}>
          <OC label="Urgent Exit" sub="Require a prompt transaction" selected={form.sell_intent==='distress'} onClick={() => pick('sell_intent','distress')} />
          <OC label="Capital Gain" sub="Selling to realise appreciation" selected={form.sell_intent==='capital_gain'} onClick={() => pick('sell_intent','capital_gain')} />
        </div>
        <div className={`${s.oerr} ${errors.sell_intent ? s.oerrShow : ''}`}>Please select a selling objective</div>
        <BtnRow back onPrev={prev} onNext={next} />
      </div>
    );

    if (id === 'pricing') {
      const fillW = speed ? speed.sc + '%' : '0%';
      const fillBg = speed ? (speed.cls === 'fast' ? '#3D7A56' : speed.cls === 'med' ? '#7A5A18' : '#A84040') : '#3D7A56';
      const statusCls = speed ? (speed.cls === 'fast' ? s.spStatusFast : speed.cls === 'med' ? s.spStatusMed : s.spStatusSlow) : '';
      const apprCls = priceDiff !== null ? (priceDiff > 0 ? s.apprPos : priceDiff < 0 ? s.apprNeg : s.apprAt) : '';

      return (
        <div className={s.si} key={id}>
          <div className={s.sTitle}>Pricing and demand</div>
          <div className={s.sSub}>Your demand estimate updates in real time as you enter the figures below.</div>
          <div className={s.priceGrid}>
            <div className={`${s.field} ${errors.original_price ? s.fieldErr : ''}`} style={{ margin: 0 }}>
              <label className={s.fieldLabel}>Original Purchase Price (AED) <span className={s.req}>*</span></label>
              <input className={s.fieldInput} type="number" placeholder="1,500,000" value={form.original_price} onChange={e => upd('original_price', e.target.value)} min="0" />
              <div className={s.emsg}>This field is required</div>
              <div className={s.priceWords}>{toAEDWords(form.original_price)}</div>
            </div>
            <div className={`${s.field} ${errors.asking_price ? s.fieldErr : ''}`} style={{ margin: 0 }}>
              <label className={s.fieldLabel}>Your Asking Price (AED) <span className={s.req}>*</span></label>
              <input className={s.fieldInput} type="number" placeholder="1,650,000" value={form.asking_price} onChange={e => upd('asking_price', e.target.value)} min="0" />
              <div className={s.emsg}>This field is required</div>
              <div className={s.priceWords}>{toAEDWords(form.asking_price)}</div>
            </div>
          </div>
          <div className={`${s.apprStrip} ${apprCls}`}>
            <span className={s.apprLbl}>Price Differential</span>
            <span className={s.apprVal}>{priceDiff !== null ? `${priceDiff > 0 ? '+' : ''}${priceDiff.toFixed(1)}%` : '—'}</span>
            <span className={s.apprNote}>vs. original price</span>
          </div>
          <div className={`${s.speedBlock} ${speed ? s.speedBlockLit : ''}`}>
            <div className={s.spTop}>
              <span className={s.spLbl}>Demand Analysis</span>
              <span className={`${s.spStatus} ${statusCls}`}>{speed ? speed.lbl : 'Awaiting input'}</span>
            </div>
            <div className={s.spTrack}>
              <div className={s.spFill} style={{ width: fillW, background: fillBg }} />
            </div>
            <div className={s.spTicks}>
              <span>At cost</span><span>+10%</span><span>+20%</span><span>+30%</span><span>+50%</span>
            </div>
            <div className={`${s.spText} ${!speed ? s.spTextEmpty : ''}`}>
              {speed ? getInsight(speed, form) : 'Enter both prices to view your live demand estimate.'}
            </div>
          </div>
          <BtnRow back onPrev={prev} onNext={next} />
        </div>
      );
    }

    if (id === 'property_info') return (
      <div className={s.si} key={id}>
        <div className={s.sTitle}>Property information</div>
        <div className={s.sSub}>Accurate details help buyers evaluate your property with confidence.</div>
        <div className={`${s.field} ${errors.project_name ? s.fieldErr : ''}`}>
          <label className={s.fieldLabel}>Project Name <span className={s.req}>*</span></label>
          <input className={s.fieldInput} placeholder="e.g. Marina Vista, Emaar Beachfront" value={form.project_name} onChange={e => upd('project_name', e.target.value)} />
          <div className={s.emsg}>Please enter the project name</div>
        </div>
        <div className={s.field}>
          <label className={s.fieldLabel}>Developer Name</label>
          <input className={s.fieldInput} placeholder="e.g. Emaar, Damac, Nakheel, Meraas" value={form.developer_name} onChange={e => upd('developer_name', e.target.value)} />
        </div>
        <div className={`${s.field} ${errors.project_location ? s.fieldErr : ''}`}>
          <label className={s.fieldLabel}>Project Location <span className={s.req}>*</span></label>
          <input className={s.fieldInput} placeholder="e.g. Downtown Dubai, Dubai Marina, Palm Jumeirah" value={form.project_location} onChange={e => upd('project_location', e.target.value)} />
          <div className={s.emsg}>Please enter the project location</div>
        </div>
        <div className={s.frow}>
          <div className={s.field}>
            <label className={s.fieldLabel}>Area (sq. ft.)</label>
            <input className={s.fieldInput} type="number" placeholder="1,200" value={form.area_sqft} onChange={e => upd('area_sqft', e.target.value)} />
          </div>
          <div className={s.field}>
            <label className={s.fieldLabel}>Floor Number</label>
            <input className={s.fieldInput} placeholder="e.g. 14 or Ground" value={form.floor_no} onChange={e => upd('floor_no', e.target.value)} />
          </div>
        </div>
        <div className={s.frow}>
          <div className={s.field}>
            <label className={s.fieldLabel}>Bedrooms</label>
            <select className={s.fieldSelect} value={form.bedrooms} onChange={e => upd('bedrooms', e.target.value)}>
              {['','Studio','1','2','3','4','5','6+'].map(v => <option key={v} value={v}>{v || 'Select'}</option>)}
            </select>
          </div>
          <div className={s.field}>
            <label className={s.fieldLabel}>Bathrooms</label>
            <select className={s.fieldSelect} value={form.bathrooms} onChange={e => upd('bathrooms', e.target.value)}>
              {['','1','2','3','4','5','6+'].map(v => <option key={v} value={v}>{v || 'Select'}</option>)}
            </select>
          </div>
        </div>
        <div className={s.field}>
          <label className={s.fieldLabel}>Additional Notes</label>
          <textarea className={s.fieldTextarea} placeholder="View type, parking, furnishing status, or any distinguishing features" value={form.notes} onChange={e => upd('notes', e.target.value)} />
        </div>
        <div className={s.field}>
          <label className={s.fieldLabel}>Oqood / DLD Registration Copy <span className={s.uploadOptional}>Optional</span></label>
          <div className={s.uploadRow}>
            {!oqoodFile ? (
              <>
                <div className={s.uploadBtn}>
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                    <path d="M9 12V4M9 4L6 7M9 4L12 7" stroke={theme.palette.grey[600]} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 13.5V14.5C3 15.05 3.45 15.5 4 15.5H14C14.55 15.5 15 15.05 15 14.5V13.5" stroke={theme.palette.grey[600]} strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                  Choose file
                  <input type="file" className={s.uploadBtnInput} accept=".pdf" onChange={e => { const f = e.target.files?.[0]; if (f && f.size <= 15 * 1024 * 1024) setOqoodFile(f); }} />
                </div>
                <span className={s.uploadHint}>PDF only · Max 15MB</span>
              </>
            ) : (
              <div className={s.fileChip}>
                <div className={s.fileIcon}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M4 1h5.5L13 4.5V14a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1z" stroke={theme.palette.success.main} strokeWidth="1.1" fill="none"/>
                    <path d="M9 1v4h4" stroke={theme.palette.success.main} strokeWidth="1.1" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className={s.fileInfo}>
                  <span className={s.fileName}>{oqoodFile.name}</span>
                  <span className={s.fileSize}>{(oqoodFile.size / 1024).toFixed(0)} KB</span>
                </div>
                <button type="button" className={s.filePreview} onClick={() => window.open(URL.createObjectURL(oqoodFile), '_blank')}>Preview</button>
                <button type="button" className={s.fileDelete} onClick={() => setOqoodFile(null)} title="Remove file">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
        <BtnRow back onPrev={prev} onNext={next} />
      </div>
    );

    if (id === 'review') return (
      <div className={s.si} key={id}>
        <div className={s.sTitle}>Review your submission</div>
        <div className={s.sSub}>Please confirm the details before we send this to our team.</div>
        <div className={s.rb}>
          <div className={s.rbHead}>Seller</div>
          <RR k="Name" v={form.full_name} />
          <RR k="Email" v={form.email} />
          <RR k="Phone" v={`${form.phone_code} ${form.phone}`} />
          {form.nationality && <RR k="Nationality" v={form.nationality} />}
        </div>
        <div className={s.rb}>
          <div className={s.rbHead}>Property</div>
          <RR k="Category" v={TM[form.property_type]} />
          <RR k="Status" v={form.listing_type === 'off_plan' ? 'Off-Plan' : form.listing_type === 'ready' ? 'Ready to Move In' : '—'} />
          {form.listing_type === 'off_plan' && <RR k="Stage" v={SM[form.offplan_stage]} />}
          {form.listing_type === 'ready' && <RR k="Occupancy" v={OM[form.ready_occupancy]} />}
          <RR k="Objective" v={IM[form.sell_intent]} />
          <RR k="Project Name" v={form.project_name} />
          {form.developer_name && <RR k="Developer" v={form.developer_name} />}
          <RR k="Location" v={form.project_location} />
          {oqoodFile && (
            <div className={s.rr}>
              <span className={s.rk}>Attached PDF</span>
              <a className={s.rvLink} href={URL.createObjectURL(oqoodFile)} target="_blank" rel="noopener noreferrer">{oqoodFile.name}</a>
            </div>
          )}
          {form.bedrooms && <RR k="Configuration" v={`${form.bedrooms} BR · ${form.bathrooms || '—'} Bath`} />}
          {form.area_sqft && <RR k="Area" v={`${Number(form.area_sqft).toLocaleString()} sq. ft.`} />}
        </div>
        <div className={s.rb}>
          <div className={s.rbHead}>Pricing</div>
          <RR k="Original Price" v={fa(form.original_price)} />
          <RR k="Asking Price" v={fa(form.asking_price)} />
          {speed && <>
            <RR k="Differential" v={`+${speed.pct}%`} gold />
            <RR k="Demand Estimate" v={speed.lbl} gold />
          </>}
        </div>
        <div className={s.brow}>
          <button className={`${s.btn} ${s.btnBk}`} onClick={prev}>Back</button>
          <button className={`${s.btn} ${s.btnSub}`} onClick={doSubmit}>Submit Listing</button>
        </div>
      </div>
    );
  };

  /* ── OTP Screen ── */
  if (screen === 'otp') return (
    <div className={s.page}>
      <Toast toast={toast} onClose={() => setToast(null)} />
      <Topbar />
      <div className={s.formWrap}>
        <div className={s.card} ref={cardRef}>
          <OTPScreen
            email={form.email}
            name={form.full_name.split(' ')[0]}
            onVerified={finalSubmit}
            onToast={showToast}
          />
        </div>
        <Footer />
      </div>
    </div>
  );

  /* ── Submitting ── */
  if (screen === 'submitting') return (
    <div className={s.page}>
      <Toast toast={toast} onClose={() => setToast(null)} />
      <Topbar />
      <div className={s.formWrap}>
        <div className={s.card}>
          <div className={s.otpSending}><span className={s.spinGold} /> Submitting your listing...</div>
        </div>
        <Footer />
      </div>
    </div>
  );

  /* ── Success ── */
  if (screen === 'success') return (
    <div className={s.page}>
      <Toast toast={toast} onClose={() => setToast(null)} />
      <Topbar />
      <div className={s.formWrap}>
        <div className={s.card}>
          <div className={s.success}>
            <div className={s.successCheck}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10.5L8.5 15L16 6" stroke={theme.palette.success.main} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h2 className={s.successH2}>Submission received{form.full_name ? `, ${form.full_name.split(' ')[0]}` : ''}.</h2>
            <p className={s.successP}>A Fortune DXB property specialist will be in touch<br/>within 24 hours on <strong>{form.phone_code} {form.phone}</strong> and via email.</p>
            <div className={s.refCard}>
              <p className={s.refCardLabel}>Your reference number</p>
              <strong className={s.refCardCode}>{refCode.current}</strong>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );

  /* ── Main Form ── */
  return (
    <div className={s.page}>
      <Toast toast={toast} onClose={() => setToast(null)} />
      <Topbar />

      <div className={s.heroWrap}>
        <div className={s.hero}>
          <span className={s.heroTag}>Trusted by NRI &amp; Expat Sellers Worldwide</span>
          <h1 className={s.heroH1}>Your property deserves<br/>the right buyer.</h1>
          <p className={s.heroP}>Fortune DXB connects serious sellers with qualified global investors — faster, smarter, with full demand visibility.</p>
          <div className={s.statStrip}>
            <div className={s.stat}>
              <div className={s.statVal}>AED 3.2B<span className={s.statSup}>+</span></div>
              <div className={s.statLbl}>In transactions closed</div>
            </div>
            <div className={s.statDiv} />
            <div className={s.stat}>
              <div className={s.statVal}>40<span className={s.statSup}>+</span></div>
              <div className={s.statLbl}>Global buyer markets</div>
            </div>
            <div className={s.statDiv} />
            <div className={s.stat}>
              <div className={s.statVal}>98<span className={s.statSup}>%</span></div>
              <div className={s.statLbl}>Client satisfaction rate</div>
            </div>
          </div>
        </div>
      </div>

      <div className={s.formWrap} style={{ paddingBottom: 60 }}>
        <ProgressDots cur={cur} total={STEPS.length} />
        <div className={s.card} ref={cardRef}>
          <span className={s.cardRule} />
          {renderStep()}
        </div>
      </div>

      <TestimonialsSection />

      <div className={s.footerWrap}>
        <Footer />
      </div>
    </div>
  );
}