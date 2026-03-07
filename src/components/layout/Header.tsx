import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'Servicios', href: '/#servicios' },
  { name: 'Casos', href: '/#casos' },
  { name: 'Blog', href: '/blog' },
  { name: 'Quién Soy', href: '/quien-soy' },
  { name: 'Contacto', href: '/#contacto' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
