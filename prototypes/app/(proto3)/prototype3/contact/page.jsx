import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import Reveal from '@/components/prototype3/Reveal';
import Footer from '@/components/prototype3/Footer';
import ContactForm from '@/components/prototype3/ContactForm';

export const metadata = { title: 'Contact — Fortune' };

const INFO = [
  { icon: MapPin, label: 'Office', value: 'Business Bay, Dubai, UAE' },
  { icon: Phone, label: 'Phone', value: '+971 4 000 0000' },
  { icon: Mail, label: 'Email', value: 'hello@fortunedxb.ae' },
  { icon: Clock, label: 'Hours', value: 'Sun–Fri · 9am – 7pm GST' },
];

export default function ContactPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-14">
        <Reveal className="mb-8 max-w-2xl sm:mb-10">
          <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#C49A3C]">Get in touch</span>
          <h1 className="text-4xl font-bold tracking-tight text-[#0A0A12] sm:text-5xl font-[family-name:var(--font-heading)]">Let&apos;s find your unit</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-[#55555E]">
            Tell us your budget and goals — an advisor matches you with the right off-plan launch or below-market resale within 24 hours.
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
          {/* Form */}
          <Reveal>
            <ContactForm />
          </Reveal>

          {/* Info */}
          <Reveal delay={90} className="flex flex-col gap-4">
            <div className="rounded-3xl border border-[rgba(10,10,18,0.08)] bg-[#FAF7F3] p-6 sm:p-8">
              <h2 className="text-lg font-bold tracking-tight text-[#0A0A12] font-[family-name:var(--font-heading)]">Reach us directly</h2>
              <ul className="mt-5 space-y-4">
                {INFO.map((it) => (
                  <li key={it.label} className="flex items-start gap-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#C49A3C] shadow-sm">
                      <it.icon size={17} />
                    </span>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9A9AA3]">{it.label}</div>
                      <div className="text-sm font-semibold text-[#0A0A12]">{it.value}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="https://wa.me/97140000000"
              target="_blank"
              rel="noopener"
              className="group flex items-center justify-between gap-3 rounded-3xl bg-[#0A0A12] p-6 text-white transition-colors hover:bg-[#15151C]"
            >
              <div className="flex items-center gap-3.5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#25D366]/15 text-[#25D366]">
                  <MessageCircle size={18} />
                </span>
                <div>
                  <div className="text-sm font-bold font-[family-name:var(--font-heading)]">Chat on WhatsApp</div>
                  <div className="text-xs text-white/55">Fastest way to reach an advisor</div>
                </div>
              </div>
              <span className="text-[#C49A3C] transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </Reveal>
        </div>
      </section>

      <div className="mt-16 sm:mt-20 md:mt-28">
        <Footer />
      </div>
    </div>
  );
}
