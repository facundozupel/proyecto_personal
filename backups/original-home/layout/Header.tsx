import { useState, useEffect, useRef } from 'react';
import { Container } from '../ui';

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: '¿Quién soy?', href: '/quien-soy' },
];

const navLinksAfter = [
  { name: 'Proceso', href: '/#proceso' },
  { name: 'Blog', href: '/blog' },
];

const servicesClusters = [
  {
    title: 'Consultoría SEO',
    links: [
      { name: 'Consultor SEO Chile', href: '/consultor-seo-chile' },
      { name: 'Consultoría SEO Mensual', href: '/consultoria-seo-mensual' },
      { name: 'Auditoría SEO', href: '/auditoria-seo-chile' },
    ],
  },
  {
    title: 'Estrategia & Posicionamiento',
    links: [
      { name: 'Estrategia SEO', href: '/estrategia-seo' },
      { name: 'Posicionamiento Web Chile', href: '/posicionamiento-web-chile' },
    ],
  },
  {
    title: 'SEO Especializado',
    links: [
      { name: 'SEO Técnico', href: '/seo-tecnico' },
      { name: 'SEO para Ecommerce', href: '/seo-ecommerce' },
      { name: 'SEO Local Chile', href: '/seo-local-chile' },
      { name: 'Migración SEO', href: '/migracion-seo' },
    ],
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  };

  const handleServicesEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 150);
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

            {/* Services Mega Menu */}
            <div
              className="relative"
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <button
                className="relative text-white/70 hover:text-white font-medium transition-colors group inline-flex items-center gap-1 cursor-pointer"
                onClick={() => setServicesOpen(!servicesOpen)}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Servicios
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-500 to-primary-500 transition-all duration-300 group-hover:w-full" />
              </button>

              {servicesOpen && (
                <div className="absolute top-full right-0 md:left-1/2 md:-translate-x-1/2 pt-4 z-50">
                  <div className="w-[640px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-8 animate-fade-in">
                    <div className="grid grid-cols-3 gap-8">
                      {servicesClusters.map((cluster) => (
                        <div key={cluster.title}>
                          <h3 className="text-xs font-semibold text-accent-400 uppercase tracking-wider mb-4">
                            {cluster.title}
                          </h3>
                          <ul className="space-y-3">
                            {cluster.links.map((link) => (
                              <li key={link.href}>
                                <a
                                  href={link.href}
                                  className="text-white/60 hover:text-white text-sm transition-colors block py-0.5"
                                >
                                  {link.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {navLinksAfter.map((link) => (
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
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-white/70 hover:text-white font-medium transition-colors px-2 py-2.5"
                >
                  {link.name}
                </a>
              ))}

              {/* Services Accordion */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center justify-between w-full text-white/70 hover:text-white font-medium transition-colors px-2 py-2.5 cursor-pointer"
                  aria-expanded={mobileServicesOpen}
                >
                  Servicios
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {mobileServicesOpen && (
                  <div className="pl-3 mt-1 space-y-4 pb-2 animate-fade-in">
                    {servicesClusters.map((cluster) => (
                      <div key={cluster.title}>
                        <h4 className="text-xs font-semibold text-accent-400 uppercase tracking-wider mb-2 px-2">
                          {cluster.title}
                        </h4>
                        <div className="space-y-0.5">
                          {cluster.links.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              onClick={handleLinkClick}
                              className="block text-white/50 hover:text-white text-sm transition-colors px-2 py-1.5"
                            >
                              {link.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {navLinksAfter.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-white/70 hover:text-white font-medium transition-colors px-2 py-2.5"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-2">
                <button
                  data-open-contact
                  onClick={handleLinkClick}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-full transition-all shadow-lg cursor-pointer w-full"
                >
                  Agendar Consulta
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
