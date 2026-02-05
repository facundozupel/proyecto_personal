import { Container } from '../ui';

const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/facundo-zupel-b7513916a/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const footerLinks = {
  servicios: [
    { name: 'Consultor SEO Chile', href: '/consultor-seo-chile' },
    { name: 'Consultoría SEO Mensual', href: '/consultoria-seo-mensual' },
    { name: 'SEO para Ecommerce', href: '/seo-ecommerce' },
    { name: 'SEO Técnico', href: '/seo-tecnico' },
    { name: 'Auditoría SEO', href: '/auditoria-seo-chile' },
    { name: 'SEO Local Chile', href: '/seo-local-chile' },
    { name: 'Posicionamiento Web Chile', href: '/posicionamiento-web-chile' },
    { name: 'Estrategia SEO', href: '/estrategia-seo' },
    { name: 'Migración SEO', href: '/migracion-seo' },
  ],
  recursos: [
    { name: 'Blog', href: '/blog' },
    { name: 'Casos de Éxito', href: '#resultados' },
    { name: 'FAQ', href: '#faq' },
  ],
  legal: [
    { name: 'Política de Privacidad', href: '/privacidad' },
    { name: 'Términos y Condiciones', href: '/terminos' },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/[0.05]">
      <Container as="div">
        <div className="py-16 md:py-20">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-display font-bold bg-gradient-to-r from-white to-accent-400 bg-clip-text text-transparent mb-4">
                Facundo Zupel
              </h3>
              <p className="text-white/50 mb-6 max-w-md leading-relaxed">
                Consultor especializado en Organic Growth y Automatizaciones. Ayudo a empresas a
                escalar sin aumentar su presupuesto publicitario.
              </p>
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Servicios Column */}
            <div>
              <h4 className="text-white font-semibold mb-5">Servicios</h4>
              <ul className="space-y-3">
                {footerLinks.servicios.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/50 hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recursos & Legal Column */}
            <div>
              <h4 className="text-white font-semibold mb-5">Recursos</h4>
              <ul className="space-y-3 mb-8">
                {footerLinks.recursos.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/50 hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              <h4 className="text-white font-semibold mb-5">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/50 hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/[0.05] mt-12 pt-8">
            <p className="text-white/40 text-sm text-center">
              © {currentYear} Facundo Zupel. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
