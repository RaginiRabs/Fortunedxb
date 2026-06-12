// prototype1 partners strip — "trusted by leading developers". Mock only.
import { partners } from '@/mock/prototype1/home';

export default function Partners() {
  return (
    <section className="border-y border-gray-100 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-8">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400">
          Trusted by Dubai&apos;s leading developers
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {partners.map((p) => (
            <span
              key={p}
              className="text-lg font-semibold tracking-wide text-gray-300 transition-colors hover:text-[#B89149]"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
