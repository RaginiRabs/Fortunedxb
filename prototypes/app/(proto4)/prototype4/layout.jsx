// prototype4 OWN layout + theme — formal luxury (white + bronze gradient).
import { Montserrat, Work_Sans } from 'next/font/google';
import Navbar from '@/components/prototype4/Navbar';
import logo from './Fortune-realty-logo-new.png';

const heading = Montserrat({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-heading' });
const body = Work_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body' });

export const metadata = { title: 'Prototype 4 — Formal Luxury' };

export default function Prototype4Layout({ children }) {
  return (
    <div className={`${heading.variable} ${body.variable} h-screen overflow-y-auto no-scrollbar bg-white text-[#2a2520] flex flex-col font-[family-name:var(--font-body)] font-medium`}>
      <Navbar logo={logo} />
      <main className="flex-1">{children}</main>
      <footer className="px-6 md:px-12 py-6 border-t border-[#e8e2da] text-xs text-[#80603f]/70">
        Prototype 4 · Fortune Realty · mock data
      </footer>
    </div>
  );
}
