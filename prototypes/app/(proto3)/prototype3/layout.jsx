// prototype3 OWN layout — clean luxury (light neutral + gold), own fresh navbar.
import { Montserrat, Work_Sans } from 'next/font/google';
import Navbar from '@/components/prototype3/Navbar';

const heading = Montserrat({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--font-heading' });
const body = Work_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body' });

export const metadata = { title: 'Prototype 3' };

export default function Prototype3Layout({ children }) {
  return (
    <div
      className={`proto3-scope ${heading.variable} ${body.variable} min-h-screen bg-[#FAFAF8] text-[#15151C] flex flex-col font-[family-name:var(--font-body)]`}
    >
      {/* Single source of truth for type across home, projects, distress & detail
          pages: Montserrat for headings + display numbers, Work Sans for body.
          The detail components lean on font-serif/font-mono utilities — remap them
          here so every page shares one consistent type system. */}
      <style>{`
        .proto3-scope :is(h1,h2,h3,h4,h5,h6),
        .proto3-scope .font-serif{font-family:var(--font-heading),"Segoe UI",sans-serif}
        .proto3-scope .font-mono{font-family:var(--font-body),"Segoe UI",sans-serif;font-variant-numeric:tabular-nums}
      `}</style>
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
