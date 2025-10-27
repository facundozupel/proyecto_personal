import { describe, it, expect } from 'vitest';

/**
 * Tests para verificar que los path aliases (@/) funcionan correctamente
 */
describe('Path Aliases', () => {
  it('should import Button component using @/components alias', async () => {
    const { Button } = await import('@/components/ui/Button');
    expect(Button).toBeDefined();
    expect(typeof Button).toBe('function');
  });

  it('should import Container component using @/components alias', async () => {
    const { Container } = await import('@/components/ui/Container');
    expect(Container).toBeDefined();
    expect(typeof Container).toBe('function');
  });

  it('should import Card component using @/components alias', async () => {
    const { Card } = await import('@/components/ui/Card');
    expect(Card).toBeDefined();
    expect(typeof Card).toBe('function');
  });

  it('should import Section component using @/components alias', async () => {
    const { Section } = await import('@/components/ui/Section');
    expect(Section).toBeDefined();
    expect(typeof Section).toBe('function');
  });

  it('should import Heading component using @/components alias', async () => {
    const { Heading } = await import('@/components/ui/Heading');
    expect(Heading).toBeDefined();
    expect(typeof Heading).toBe('function');
  });

  it('should import Header component using @/components alias', async () => {
    const { Header } = await import('@/components/layout/Header');
    expect(Header).toBeDefined();
    expect(typeof Header).toBe('function');
  });

  it('should import Footer component using @/components alias', async () => {
    const { Footer } = await import('@/components/layout/Footer');
    expect(Footer).toBeDefined();
    expect(typeof Footer).toBe('function');
  });
});
