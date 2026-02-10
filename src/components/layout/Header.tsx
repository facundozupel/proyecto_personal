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

const toolsLinks = [
  { name: 'Analizador SEO con IA', href: '/analizador-seo' },
  { name: 'Calculadora de ROI', href: '/calculadora-roi-seo' },
];

const servicesClusters = [
  {
    title: 'Consultoría SEO',
    links: [
      { name: 'Consultor SEO Chile', href: '/consultor-seo-chile' },
      { name: 'Auditoría SEO', href: '/auditoria-seo-chile' },
    ],
  },
  {
    title: 'Estrategia & Posicionamiento',
    links: [
      { name: 'Estrategia SEO', href: '/estrategia-seo' },
      { name: 'Migración SEO', href: '/migracion-seo' },
    ],
  },
  {
    title: 'SEO Especializado',
    links: [
      { name: 'SEO Técnico', href: '/seo-tecnico' },
      { name: 'SEO para Ecommerce', href: '/seo-ecommerce' },
      { name: 'SEO Local Chile', href: '/seo-local-chile' },
    ],
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toolsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
    };
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileToolsOpen(false);
  };

  const handleServicesEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const handleToolsEnter = () => {
    if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
    setToolsOpen(true);
  };

  const handleToolsLeave = () => {
    toolsTimeoutRef.current = setTimeout(() => setToolsOpen(false), 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 flex items-center ${
        scrolled
          ? 'glass-nav border-b border-white/[0.08]'
          : 'bg-transparent'
      }`}
    >
      <Container as="div" className="w-full">
        <nav aria-label="Navegación principal" className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-xl font-semibold text-white hover:opacity-80 transition-opacity">
            Facundo Zupel
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[15px] font-medium text-white/70 hover:text-white transition-colors duration-150"
              >
                {link.name}
              </a>
            ))}

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <button
                className="text-[15px] font-medium text-white/70 hover:text-white transition-colors duration-150 inline-flex items-center gap-1 cursor-pointer"
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
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50">
                  <div className="w-[660px] bg-[#0a0a0a] border border-white/[0.08] rounded-xl p-8 shadow-2xl">
                    <div className="grid grid-cols-3 gap-10">
                      {servicesClusters.map((cluster) => (
                        <div key={cluster.title}>
                          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">
                            {cluster.title}
                          </h3>
                          <ul className="space-y-3">
                            {cluster.links.map((link) => (
                              <li key={link.href}>
                                <a
                                  href={link.href}
                                  className="text-white/60 hover:text-white text-sm transition-colors duration-150"
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
                className="text-[15px] font-medium text-white/70 hover:text-white transition-colors duration-150"
              >
                {link.name}
              </a>
            ))}

            {/* Tools dropdown */}
            <div
              className="relative"
              onMouseEnter={handleToolsEnter}
              onMouseLeave={handleToolsLeave}
            >
              <button
                className="text-[15px] font-medium text-white/70 hover:text-white transition-colors duration-150 inline-flex items-center gap-1 cursor-pointer"
                onClick={() => setToolsOpen(!toolsOpen)}
                aria-expanded={toolsOpen}
                aria-haspopup="true"
              >
                Tools
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {toolsOpen && (
                <div className="absolute top-full right-0 pt-4 z-50">
                  <div className="w-[220px] bg-[#0a0a0a] border border-white/[0.08] rounded-xl p-4 shadow-2xl">
                    <ul className="space-y-2">
                      {toolsLinks.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            className="block text-white/60 hover:text-white text-sm transition-colors duration-150 px-2 py-1.5 rounded-lg hover:bg-white/[0.05]"
                          >
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button
              data-open-contact
              className="px-6 py-2.5 bg-[#0070F3] text-white text-sm font-medium rounded-lg hover:bg-[#005AC8] transition-all duration-200 cursor-pointer"
            >
              Agendar Consulta
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú de navegación"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/[0.08] mt-4">
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
                  <div className="pl-3 mt-1 space-y-4 pb-2">
                    {servicesClusters.map((cluster) => (
                      <div key={cluster.title}>
                        <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 px-2">
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

              <div>
                <button
                  onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                  className="flex items-center justify-between w-full text-white/70 hover:text-white font-medium transition-colors px-2 py-2.5 cursor-pointer"
                  aria-expanded={mobileToolsOpen}
                >
                  Tools
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${mobileToolsOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {mobileToolsOpen && (
                  <div className="pl-3 mt-1 space-y-0.5 pb-2">
                    {toolsLinks.map((link) => (
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
                )}
              </div>

              <div className="pt-2">
                <button
                  data-open-contact
                  onClick={handleLinkClick}
                  className="w-full px-6 py-3 bg-[#0070F3] text-white font-medium rounded-lg hover:bg-[#005AC8] transition-all cursor-pointer"
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
