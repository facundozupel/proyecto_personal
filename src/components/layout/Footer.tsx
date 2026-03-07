import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'Servicios', href: '/#servicios' },
  { name: 'Casos', href: '/#casos' },
  { name: 'Blog', href: '/blog' },
  { name: 'Quién Soy', href: '/quien-soy' },
  { name: 'Contacto', href: '/#contacto' },
];

const currentYear = new Date().getFullYear();

export function Footer() {
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
    <>
      {/* Footer Top */}
      <div className="footer_top">
        <div className="footer_block is-clocks">
          <div className="footer_time-block">
            <span className="footer_dot" />
            <p className="footer_time-text">
              <span>{chileTime}</span> CLT
              <br />
              Santiago
              <br />
              Chile
            </p>
          </div>
          <div className="footer_time-block">
            <span className="footer_dot" />
            <p className="footer_time-text">
              <span>{spainTime}</span> CET
              <br />
              Barcelona
              <br />
              Spain
            </p>
          </div>
        </div>
        <div className="footer_block is-menu">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="footer_link">
              {link.name}
            </a>
          ))}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer_bottom">
        <div className="footer_block is-brand">
          <a href="/" className="footer_logo-link">
            <span className="footer_brand-name">Facundo Zupel</span>
            <span className="footer_brand-tagline">
              Consultor SEO
              <br />
              & Organic Growth
            </span>
          </a>
        </div>
        <div className="footer_block is-corner">
          <span>&copy; {currentYear} Facundo Zupel. Todos los derechos reservados.</span>
        </div>
      </div>
    </>
  );
}
