// prototype3 OWN layout — clean luxury (light neutral + gold), own fresh navbar.
import { Montserrat, Work_Sans } from 'next/font/google';
import Navbar from '@/components/prototype3/Navbar';

const heading = Montserrat({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--font-heading' });
const body = Work_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body' });

export const metadata = { title: 'Prototype 3' };

export default function Prototype3Layout({ children }) {
  return (
    <div
      className={`${heading.variable} ${body.variable} min-h-screen bg-[#FAFAF8] text-[#15151C] flex flex-col font-[family-name:var(--font-body)]`}
    >
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
