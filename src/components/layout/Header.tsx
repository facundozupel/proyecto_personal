import { useState, useEffect } from 'react';
import { Container } from '../ui';

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: '¿Quién soy?', href: '/quien-soy' },
  { name: 'Servicios', href: '/#servicios' },
  { name: 'Proceso', href: '/#proceso' },
  { name: 'Blog', href: '/blog' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <Container as="div">
        <nav aria-label="Navegación principal" className="flex items-center justify-between py-4">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-2xl font-display font-bold bg-gradient-to-r from-white to-accent-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              Facundo Zupel
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-white/70 hover:text-white font-medium transition-colors group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-500 to-primary-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <button
              data-open-contact
              className="relative overflow-hidden inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-full hover:scale-105 transition-all shadow-lg shadow-accent-500/30 animate-pulse-glow cursor-pointer"
            >
              <span className="relative z-10">Agendar Consulta</span>
              <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú de navegación"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden py-4 border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl animate-fade-in"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-white/70 hover:text-white font-medium transition-colors px-2 py-2"
                >
                  {link.name}
                </a>
              ))}
              <button
                data-open-contact
                onClick={handleLinkClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-full transition-all shadow-lg cursor-pointer w-full"
              >
                Agendar Consulta
              </button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
