// prototype1 OWN layout + theme — dark luxury (charcoal + champagne gold).
export const metadata = { title: 'Fortune Realty L.L.C — Prototype 1' };

export default function Prototype1Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#F7F6F3] text-[#1A1A1A] flex flex-col font-sans">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-black/[0.06] bg-white/85 px-6 md:px-12 py-3 backdrop-blur">
        <a href="/prototype1" className="inline-flex">
          <img src="/images/fortune-logo.png" alt="Fortune Realty L.L.C" className="h-9 w-auto" />
        </a>
        <nav className="flex items-center gap-6 text-[13px] font-medium text-[#5B5B5B]">
          <a href="/prototype1" className="hover:text-[#8C6A57] transition-colors">Home</a>
          <a href="/" className="hover:text-[#8C6A57] transition-colors">Projects</a>
          <a
            href="#"
            className="rounded-full bg-[#8C6A57] px-4 py-2 text-white hover:bg-[#74543F] transition-colors"
          >
            Contact Us
          </a>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="flex flex-col items-center gap-2 border-t border-black/[0.06] bg-white px-6 md:px-12 py-8 text-center">
        <img src="/images/fortune-logo.png" alt="Fortune Realty L.L.C" className="h-7 w-auto" />
        <p className="text-xs text-[#9a917f]">© Fortune Realty L.L.C · Prototype · mock data</p>
      </footer>
    </div>
  );
}
