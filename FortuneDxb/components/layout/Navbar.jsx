'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';

const primaryLinks = [
  { label: 'Portfolios', href: '/projects' },
  { label: 'Exclusive Allotments', href: '/exclusive-allocations' },
  { label: 'Investor Intelligence', href: '/insights' },
];

const companyLinks = [
  { label: 'List Your Asset', href: '/seller' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// Expanding 1px underline on hover, microscopic opacity shift
const navLink =
  'relative text-[11px] uppercase tracking-[0.18em] text-white/50 hover:text-[#F5F2ED] transition-colors duration-300 ' +
  'after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleAdvisoryScroll = (e) => {
    e.preventDefault();
    const element = document.getElementById('concierge-intake');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#161310]/80 backdrop-blur-md border-b border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="block select-none">
              <img
                src="/asset/logowhite.png"
                alt="Fortune DXB"
                className="h-10 w-auto object-contain"
              />
            </a>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-10 lg:gap-12">
            {primaryLinks.map((link) => (
              <a key={link.href} href={link.href} className={navLink}>
                {link.label}
              </a>
            ))}

            {/* Grouped dropdown — preserves visual real estate */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-white/50 group-hover:text-[#F5F2ED] transition-colors duration-300">
                Company
                <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              {/* Panel */}
              <div className="absolute right-0 top-full pt-4 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                <div className="min-w-[200px] bg-[#161310] border border-white/[0.06] rounded-sm py-2">
                  {companyLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-white/50 hover:text-[#F5F2ED] hover:bg-white/[0.04] transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Hub */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={handleAdvisoryScroll}
              className="px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] font-medium text-primary bg-transparent border border-primary hover:bg-primary hover:text-navy rounded-sm transition-colors duration-300"
            >
              Private Advisory
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/50 hover:text-[#F5F2ED] p-2 transition-colors"
              aria-label="Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay menu */}
      {isOpen && (
        <div className="md:hidden bg-[#161310] border-t border-white/[0.06] px-4 pt-2 pb-6 space-y-1">
          {[...primaryLinks, ...companyLinks].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block px-3 py-3 text-[11px] uppercase tracking-[0.18em] text-white/50 hover:text-[#F5F2ED] transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-4 mt-2 border-t border-white/[0.06] flex flex-col gap-3">
            <button
              onClick={handleAdvisoryScroll}
              className="w-full text-center px-4 py-3 text-[10px] uppercase tracking-[0.2em] font-medium text-navy bg-primary rounded-sm flex items-center justify-center gap-1.5"
            >
              Private Advisory <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
