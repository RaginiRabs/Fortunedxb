// prototype5 testimonials — client reviews. Mock only.
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/mock/prototype5/home';

const initials = (name) => name.split(' ').slice(0, 2).map((w) => w[0]).join('');

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#faf6ef]">
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-[#80603f]/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1400px] px-4 py-16 md:px-8">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#80603f]">Testimonials</p>
          <h2 className="mt-2 text-3xl font-semibold text-[#1a1a1a]">What Our Clients Say</h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="relative rounded-3xl border border-gray-100 bg-white p-7 shadow-[0_14px_40px_-14px_rgba(20,18,15,0.20)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_55px_-15px_rgba(184,145,73,0.30)]"
            >
              <Quote className="absolute right-6 top-6 h-8 w-8 text-[#80603f]/15" />
              <div className="flex gap-1 text-[#80603f]">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-[14px] leading-relaxed text-gray-600">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#96714a] to-[#6b4f33] text-sm font-semibold text-white">
                  {initials(t.name)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-[#1a1a1a]">{t.name}</span>
                  <span className="block text-xs text-gray-400">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
