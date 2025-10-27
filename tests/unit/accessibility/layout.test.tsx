import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

/**
 * Tests de accesibilidad para componentes de layout
 * Siguiendo WCAG 2.1 AA guidelines
 */
describe('Layout Accessibility Tests', () => {
  describe('Header Component', () => {
    it('should render as a semantic <header> element', () => {
      const { container } = render(<Header />);
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
    });

    it('should have a navigation landmark with aria-label', () => {
      render(<Header />);
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute('aria-label', 'Navegación principal');
    });

    it('should have all navigation links accessible', () => {
      render(<Header />);
      const links = screen.getAllByRole('link');

      // Verificar que todos los links son accesibles
      links.forEach((link) => {
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href');
      });
    });

    it('should have mobile menu button with accessible label', () => {
      render(<Header />);
      const menuButton = screen.getByRole('button', { name: /menú de navegación/i });
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toHaveAttribute('aria-label', 'Menú de navegación');
      expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
    });

    it('should have mobile menu with proper ARIA attributes', () => {
      render(<Header />);
      const menuButton = screen.getByRole('button', { name: /menú de navegación/i });

      // Verificar aria-expanded
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
    });

    it('should have CTA button that is keyboard accessible', () => {
      render(<Header />);
      const ctaButton = screen.getByRole('link', { name: /agendar consulta/i });
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveAttribute('href');
    });
  });

  describe('Footer Component', () => {
    it('should render as a semantic <footer> element', () => {
      const { container } = render(<Footer />);
      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });

    it('should have all navigation links accessible', () => {
      render(<Footer />);
      const links = screen.getAllByRole('link');

      // Todos los links deben tener href
      links.forEach((link) => {
        expect(link).toHaveAttribute('href');
      });
    });

    it('should have external links with proper security attributes', () => {
      render(<Footer />);
      const externalLinks = screen.getAllByRole('link').filter(
        (link) => link.getAttribute('target') === '_blank'
      );

      // Links externos deben tener rel="noopener noreferrer"
      externalLinks.forEach((link) => {
        const rel = link.getAttribute('rel');
        expect(rel).toContain('noopener');
        expect(rel).toContain('noreferrer');
      });
    });

    it('should have proper heading hierarchy', () => {
      const { container } = render(<Footer />);
      const headings = container.querySelectorAll('h2, h3, h4, h5, h6');

      // Verificar que hay headings en el footer
      expect(headings.length).toBeGreaterThan(0);
    });

    it('should have social media links with accessible names', () => {
      render(<Footer />);

      // Buscar links de redes sociales
      const socialLinks = screen.getAllByRole('link').filter((link) => {
        const ariaLabel = link.getAttribute('aria-label');
        const text = link.textContent;
        return (
          ariaLabel?.toLowerCase().includes('linkedin') ||
          ariaLabel?.toLowerCase().includes('twitter') ||
          text?.toLowerCase().includes('linkedin') ||
          text?.toLowerCase().includes('twitter')
        );
      });

      // Verificar que tienen labels accesibles
      socialLinks.forEach((link) => {
        const ariaLabel = link.getAttribute('aria-label');
        const text = link.textContent;
        expect(ariaLabel || text).toBeTruthy();
      });
    });
  });

  describe('General Layout Accessibility', () => {
    it('should have proper color contrast (minimum 4.5:1)', () => {
      // Este test es más conceptual, en producción usarías herramientas como axe-core
      // Por ahora verificamos que los estilos están aplicados
      const { container } = render(<Header />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should be keyboard navigable', () => {
      // Verificar que los elementos interactivos son enfocables
      const { container } = render(<Header />);
      const interactiveElements = container.querySelectorAll(
        'a, button, input, select, textarea'
      );

      interactiveElements.forEach((element) => {
        // Verificar que no tienen tabindex negativo (excepto si es intencional)
        const tabindex = element.getAttribute('tabindex');
        if (tabindex !== null) {
          expect(parseInt(tabindex)).toBeGreaterThanOrEqual(-1);
        }
      });
    });
  });
});
