// prototype1 partners strip — "trusted by leading developers". Mock only.
import { partners } from '@/mock/prototype1/home';

export default function Partners() {
  return (
    <section className="border-y border-gray-100 bg-gradient-to-b from-white to-[#faf6ef]">
      <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-8">
        {/* Heading with side accent lines */}
        <div className="flex items-center justify-center gap-4">
          <span className="hidden h-px w-16 bg-gradient-to-r from-transparent to-[#80603f]/40 sm:block" />
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-[#80603f]">
            Trusted by Dubai&apos;s Leading Developers
          </p>
          <span className="hidden h-px w-16 bg-gradient-to-l from-transparent to-[#80603f]/40 sm:block" />
        </div>

        {/* Developer pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {partners.map((p) => (
            <a
              key={p}
              href="#"
              className="rounded-full border border-[#80603f]/20 bg-white px-4 py-2 text-sm font-semibold text-[#5e4636] shadow-[0_4px_14px_-6px_rgba(20,18,15,0.18)] transition-all hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-r hover:from-[#96714a] hover:to-[#6b4f33] hover:text-white hover:shadow-md"
            >
              {p}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
