// prototype1 meet-our-agents — team cards. Mock only.
import { Phone, Mail, Instagram, Linkedin } from 'lucide-react';
import { agents } from '@/mock/prototype1/home';

export default function Agents() {
  return (
    <div>
      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#80603f]">Our Team</p>
        <h2 className="mt-2 text-3xl font-semibold text-[#1a1a1a]">Meet Our Agents</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
          Experienced, RERA-certified advisors dedicated to finding you the right property and the best deal.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {agents.map((a) => (
          <article
            key={a.id}
            className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_12px_36px_-14px_rgba(20,18,15,0.20)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_55px_-15px_rgba(128,96,63,0.30)]"
          >
            <div className="relative h-64 overflow-hidden">
              <img src={a.img} alt={a.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#80603f] backdrop-blur">{a.deals}</span>
              {/* hover social overlay */}
              <div className="absolute inset-x-0 bottom-0 flex translate-y-full justify-center gap-2 bg-gradient-to-t from-black/70 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
                {[Phone, Mail, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="grid h-8 w-8 place-items-center rounded-full bg-white/90 text-[#80603f] transition-colors hover:bg-[#80603f] hover:text-white">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
            <div className="p-4 text-center">
              <h3 className="text-[15px] font-semibold text-[#1a1a1a]">{a.name}</h3>
              <p className="text-xs text-[#80603f]">{a.role}</p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-[12px] text-gray-500">
                <Phone className="h-3.5 w-3.5 text-[#80603f]" /> {a.phone}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
