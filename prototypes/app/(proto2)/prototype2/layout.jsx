// prototype2 OWN layout + theme — Fortune Realty (bronze / cream luxury).
import { Montserrat, Work_Sans } from 'next/font/google';
import SiteNav from '@/components/prototype2/SiteNav';

// Heading font (used via font-serif) + body font (font-sans).
const serif = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-serif',
  display: 'swap',
});
const sans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = { title: 'Fortune Realty — Off-plan Dubai' };

export default function Prototype2Layout({ children }) {
  return (
    <div
      style={{ '--font-heading': 'var(--font-serif)' }}
      className={`${serif.variable} ${sans.variable} min-h-screen bg-cream text-ink flex flex-col font-sans antialiased selection:bg-brand/20`}
    >
      <SiteNav />

      <main className="flex-1">{children}</main>

      <footer className="border-t border-brand-pale px-6 py-10 md:px-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <span className="font-serif text-base font-semibold text-ink">
            Fortune Realty <span className="text-brand-light">L.L.C</span>
          </span>
          <span className="text-xs text-ink-faint">Prototype · mock data · not for distribution</span>
        </div>
      </footer>
    </div>
  );
}
