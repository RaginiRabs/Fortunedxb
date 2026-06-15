// prototype1 Contact Us page — content only; shared layout adds navbar + footer. Mock only.
import {
  UserRound, Building2, ShieldCheck, Users, MapPin, Phone, Mail, Clock, Globe,
  Facebook, Instagram, Linkedin, Youtube, MessageCircle, ArrowRight, DoorOpen, Presentation, Sofa,
} from 'lucide-react';
import ContactForm from '@/components/prototype1/ContactForm';
import ContactMap from '@/components/prototype1/ContactMap';
import Reveal from '@/components/prototype1/Reveal';

export const metadata = { title: 'Contact Us — Fortune Realty L.L.C' };

const img = (id, w = 900) => `https://images.unsplash.com/photo-${id}?w=${w}&q=72&auto=format&fit=crop`;

const FEATURES = [
  { icon: UserRound, title: 'Expert Guidance', text: 'Get advice from experienced property consultants.' },
  { icon: Building2, title: 'Tailored Solutions', text: 'We help you find properties that match your goals.' },
  { icon: ShieldCheck, title: 'Trusted & Transparent', text: 'Honest advice and clear communication always.' },
  { icon: Users, title: 'Client Focused', text: 'Your goals are our priority. We are here for you.' },
];

const DETAILS = [
  { icon: MapPin, title: 'Our Office', lines: ['Office 3407, HDS Tower,', 'Jumeirah Lake Towers, Dubai, UAE'] },
  { icon: Phone, title: 'Phone', lines: ['+971 50 123 4567', '+971 4 123 4567'] },
  { icon: Mail, title: 'Email', lines: ['info@fortunerealtydxb.com'] },
  { icon: Clock, title: 'Working Hours', lines: ['Monday – Saturday', '9:00 AM – 6:00 PM (GST)'] },
  { icon: Globe, title: 'Website', lines: ['www.fortunerealtydxb.com'] },
];

const OFFICE = [
  { label: 'Reception Area', icon: DoorOpen, img: img('1497366216548-37526070297c') },
  { label: 'Meeting Room', icon: Presentation, img: img('1497366811353-6870744d04b2') },
  { label: 'Consultation Lounge', icon: Sofa, img: img('1524758631624-e2822e304c36') },
];

const GOLD_BTN = 'inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#96714a] to-[#6b4f33] px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg hover:brightness-105';

export default function ContactPage() {
  return (
    <div className="bg-[#faf8f3]">
      {/* ===== Hero + form ===== */}
      <section className="relative -mt-[88px] overflow-hidden">
        <img src={img('1526495124232-a04e1849168c', 1800)} alt="Dubai skyline" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#0a1320]/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1320] via-[#0a1320]/80 to-transparent" />
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 pb-16 pt-[140px] md:px-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c4a98f]">Contact Us</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-white md:text-5xl">
              Let&apos;s Connect &amp; Find Your Next <span className="text-[#c4a98f]">Property</span>
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-gray-300">
              Our team is here to answer your questions and help you find the perfect real estate opportunities in Dubai.
            </p>
            <div className="mt-7 flex flex-wrap gap-8">
              <a href="tel:+971501234567" className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-[#c4a98f]"><Phone className="h-4 w-4" /></span>
                <span><span className="block text-[11px] uppercase tracking-wide text-gray-400">Call Us</span><span className="text-sm font-semibold text-white">+971 50 123 4567</span></span>
              </a>
              <a href="#" className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-[#25D366]"><MessageCircle className="h-4 w-4" /></span>
                <span><span className="block text-[11px] uppercase tracking-wide text-gray-400">WhatsApp</span><span className="text-sm font-semibold text-white">+971 50 123 4567</span></span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12}><ContactForm /></Reveal>
        </div>
      </section>

      {/* ===== Feature strip ===== */}
      <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08} className="flex items-start gap-3 lg:border-r lg:border-gray-200 lg:pr-6 lg:last:border-0">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#80603f]/10 text-[#80603f]"><f.icon className="h-5 w-5" /></span>
              <div>
                <h3 className="text-[15px] font-semibold text-[#1a1a1a]">{f.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-gray-500">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Contact details + map ===== */}
      <section className="mx-auto max-w-[1400px] px-4 pb-14 md:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.6fr]">
          {/* details card */}
          <div className="rounded-2xl bg-[#0a1320] p-7 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c4a98f]">Get in Touch</p>
            <h2 className="mt-1 text-2xl font-semibold">Our Contact Details</h2>
            <ul className="mt-6 space-y-5">
              {DETAILS.map((d) => (
                <li key={d.title} className="flex gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/5 text-[#c4a98f]"><d.icon className="h-4 w-4" /></span>
                  <div>
                    <p className="text-[13px] font-semibold text-white">{d.title}</p>
                    {d.lines.map((ln) => <p key={ln} className="text-[12.5px] text-gray-400">{ln}</p>)}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex items-center gap-3">
              <span className="text-[12px] text-gray-400">Follow Us</span>
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-gray-200 transition-colors hover:bg-[#80603f] hover:text-white"><Icon className="h-4 w-4" /></a>
              ))}
            </div>
          </div>

          {/* map */}
          <ContactMap />
        </div>
      </section>

      {/* ===== Visit our office ===== */}
      <section className="mx-auto max-w-[1400px] px-4 pb-16 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2.4fr] lg:items-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#80603f]">Visit Our Office</p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight text-[#1a1a1a]">We&apos;d Love to Meet You</h2>
            <p className="mt-4 text-[14px] leading-relaxed text-gray-500">
              Our office is located in the heart of Jumeirah Lake Towers, Dubai. Feel free to visit us during
              working hours.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {OFFICE.map((o, i) => (
              <Reveal key={o.label} delay={i * 0.1} className="group relative overflow-hidden rounded-2xl shadow-[0_14px_40px_-18px_rgba(20,18,15,0.3)]">
                <img src={o.img} alt={o.label} className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-white">
                  <o.icon className="h-4 w-4 text-[#c4a98f]" /> {o.label}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA band ===== */}
      <section className="mx-auto max-w-[1400px] px-4 pb-16 md:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#0a1320]">
          <svg viewBox="0 0 400 120" className="pointer-events-none absolute bottom-0 left-0 h-28 w-72 text-[#80603f] opacity-20" fill="none" preserveAspectRatio="xMinYMax meet" aria-hidden>
            <g stroke="currentColor" strokeWidth="1.4">
              <path d="M10 120V60l10-6v66M34 120V40l14 8v72M62 120V70l8-4v54M84 120V30c0-14 12-22 12-22s12 8 12 22v90M150 120V64l12-8v64M178 120V46l16 8v66M210 120V74l10-6v52" />
            </g>
          </svg>
          <div className="relative flex flex-col items-center justify-between gap-6 px-8 py-12 text-center lg:flex-row lg:text-left">
            <Reveal>
              <h2 className="text-2xl font-semibold text-white md:text-3xl">
                Ready to Find Your Next Great <span className="text-[#c4a98f]">Investment?</span>
              </h2>
              <p className="mt-2 text-sm text-gray-300">Talk to our experts and explore the best real estate opportunities in Dubai.</p>
            </Reveal>
            <a href="#" className={GOLD_BTN}>Schedule a Free Consultation <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      </section>
    </div>
  );
}
