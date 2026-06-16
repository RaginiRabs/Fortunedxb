// prototype5 OWN layout + theme — light luxury (white + champagne gold).
// Fonts: Montserrat (headings) + Work Sans (body), loaded by the browser via
// a Google Fonts <link> (next/font is avoided so the build stays offline-safe).
import Navbar from '@/components/prototype5/Navbar';
import Footer from '@/components/prototype5/Footer';

export const metadata = { title: 'Fortune Realty L.L.C — Prototype 1' };

export default function Prototype1Layout({ children }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Work+Sans:wght@300;400;500;600&display=swap"
      />
      <style>{`
        .p1-root { font-family: "Work Sans", "Work Sans Fallback", system-ui, sans-serif; }
        .p1-root h1, .p1-root h2, .p1-root h3, .p1-root h4, .p1-root h5, .p1-root h6 {
          font-family: "Montserrat", "Montserrat Fallback", system-ui, sans-serif;
        }
      `}</style>

      <div className="p1-root min-h-screen bg-white text-[#1a1a1a] flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
