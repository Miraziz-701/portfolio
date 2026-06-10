import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-500',
          scrolled ? 'bg-[#111111]/90 backdrop-blur-sm' : 'bg-transparent'
        )}
      >
        <div className="flex items-center justify-between px-[8vw] py-5">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-body text-sm font-medium tracking-[0.04em] uppercase text-[#EAE8E1] hover:text-[#C4A574] transition-colors duration-200"
          >
            JONATHAN.
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  'font-body text-sm tracking-[0.04em] transition-colors duration-200',
                  activeSection === i + 1
                    ? 'text-[#C4A574]'
                    : 'text-[#EAE8E1]/70 hover:text-[#C4A574]'
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                'w-5 h-[1px] bg-[#EAE8E1] transition-all duration-300',
                mobileOpen && 'rotate-45 translate-y-[3.5px]'
              )}
            />
            <span
              className={cn(
                'w-5 h-[1px] bg-[#EAE8E1] transition-all duration-300',
                mobileOpen && '-rotate-45 -translate-y-[3.5px]'
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-[99] bg-[#111111] flex flex-col items-center justify-center gap-10 transition-all duration-500 md:hidden',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="font-display text-3xl text-[#EAE8E1] hover:text-[#C4A574] transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
