import { useState, useEffect, useRef } from 'react';

const navLinks = [
  { name: 'Servicios', href: '/#servicios' },
  { name: 'Casos', href: '/#casos' },
  { name: 'Blog', href: '/blog' },
  { name: 'Quién Soy', href: '/quien-soy' },
  { name: 'Contacto', href: '/#contacto' },
];

const toolLinks = [
  { name: 'Analizador SEO', href: '/analizador-seo' },
  { name: 'Calculadora ROI SEO', href: '/calculadora-roi-seo' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const [chileTime, setChileTime] = useState('');
  const [spainTime, setSpainTime] = useState('');

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const chile = now.toLocaleTimeString('en-US', {
        timeZone: 'America/Santiago',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).replace(' ', '');
      const spain = now.toLocaleTimeString('en-US', {
        timeZone: 'Europe/Madrid',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).replace(' ', '');
      setChileTime(chile);
      setSpainTime(spain);
    };
    updateTimes();
    const interval = setInterval(updateTimes, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="navbar">
      <div className="nav_wrap">
        {/* Left: Brand */}
        <a href="/" className="nav_brand" aria-label="Inicio">
          <span className="nav_brand-title">
            Consultor SEO
            <br />
            & Organic Growth
          </span>
        </a>

        {/* Middle: Clocks */}
        <div className="nav_times">
          <div className="nav_time-block">
            <span className="nav_dot" />
            <p className="nav_time-text">
              <span>{chileTime}</span> CLT
              <br />
              Santiago
              <br />
              Chile
            </p>
          </div>
          <div className="nav_time-block">
            <span className="nav_dot" />
            <p className="nav_time-text">
              <span>{spainTime}</span> CET
              <br />
              Barcelona
              <br />
              Spain
            </p>
          </div>
        </div>

        {/* Right: Nav links (desktop) */}
        <nav className="nav_links" aria-label="Navegacion principal">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav_link">
              {link.name}
            </a>
          ))}
          <div className="nav_dropdown" ref={toolsRef}>
            <button
              type="button"
              className="nav_link nav_dropdown-toggle"
              onClick={() => setToolsOpen(!toolsOpen)}
              aria-expanded={toolsOpen}
            >
              Tools
              <svg
                className={`nav_dropdown-arrow${toolsOpen ? ' is-open' : ''}`}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M1 1l4 4 4-4" />
              </svg>
            </button>
            {toolsOpen && (
              <div className="nav_dropdown-menu">
                {toolLinks.map((link) => (
                  <a key={link.name} href={link.href} className="nav_dropdown-item">
                    {link.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="nav_mobile-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu de navegacion"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="nav_mobile-menu">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="nav_mobile-link"
            >
              {link.name}
            </a>
          ))}
          <button
            type="button"
            className="nav_mobile-link nav_mobile-tools-toggle"
            onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
          >
            Tools
            <svg
              className={`nav_dropdown-arrow${mobileToolsOpen ? ' is-open' : ''}`}
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M1 1l4 4 4-4" />
            </svg>
          </button>
          {mobileToolsOpen && (
            <div className="nav_mobile-tools-submenu">
              {toolLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="nav_mobile-link"
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}
          <button
            data-open-contact
            onClick={() => setMobileMenuOpen(false)}
            className="nav_mobile-cta"
          >
            Agendar Consulta
          </button>
        </div>
      )}
    </header>
  );
}
