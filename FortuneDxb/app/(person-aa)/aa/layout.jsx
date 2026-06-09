// person-aa's OWN layout: their own header + footer.
// Route group (person-aa) keeps this isolated from (main) and (admin).

export const metadata = {
  title: 'Fortune DXB — Person AA Redesign',
};

export default function PersonAaLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#161310] text-[#F5F2ED] flex flex-col">
      {/* Person-aa header */}
      <header className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/[0.08]">
        <span className="text-lg tracking-[0.2em] uppercase">Fortune AA</span>
        <nav className="flex gap-6 text-xs uppercase tracking-[0.14em] text-white/60">
          <a href="/aa" className="hover:text-[#B0905E] transition-colors">Home</a>
          <a href="/aa/projects" className="hover:text-[#B0905E] transition-colors">Projects</a>
        </nav>
      </header>

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* Person-aa footer */}
      <footer className="px-6 md:px-12 py-6 border-t border-white/[0.08] text-xs text-white/40">
        Person AA redesign zone — © Fortune DXB
      </footer>
    </div>
  );
}
