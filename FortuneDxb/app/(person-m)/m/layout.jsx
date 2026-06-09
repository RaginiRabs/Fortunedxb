// person-m's OWN layout: their own header + footer.
// Route group (person-m) keeps this isolated from (main) and (admin).

export const metadata = {
  title: 'Fortune DXB — Person M Redesign',
};

export default function PersonMLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#161310] text-[#F5F2ED] flex flex-col">
      {/* Person-m header */}
      <header className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/[0.08]">
        <span className="text-lg tracking-[0.2em] uppercase">Fortune M</span>
        <nav className="flex gap-6 text-xs uppercase tracking-[0.14em] text-white/60">
          <a href="/m" className="hover:text-[#B0905E] transition-colors">Home</a>
          <a href="/m/projects" className="hover:text-[#B0905E] transition-colors">Projects</a>
        </nav>
      </header>

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* Person-m footer */}
      <footer className="px-6 md:px-12 py-6 border-t border-white/[0.08] text-xs text-white/40">
        Person M redesign zone — © Fortune DXB
      </footer>
    </div>
  );
}
