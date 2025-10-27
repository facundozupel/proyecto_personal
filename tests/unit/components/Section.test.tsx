import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section } from '../../../src/components/ui/Section';

describe('Section', () => {
  it('should render children correctly', () => {
    render(
      <Section>
        <p>Section content</p>
      </Section>
    );

    expect(screen.getByText('Section content')).toBeInTheDocument();
  });

  it('should apply default white background', () => {
    const { container } = render(
      <Section>
        <p>Content</p>
      </Section>
    );

    const section = container.firstChild as HTMLElement;
    expect(section).toHaveClass('bg-white');
  });

  it('should apply gray background when specified', () => {
    const { container } = render(
      <Section background="gray">
        <p>Content</p>
      </Section>
    );

    const section = container.firstChild as HTMLElement;
    expect(section).toHaveClass('bg-neutral-100');
  });

  it('should apply primary background when specified', () => {
    const { container } = render(
      <Section background="primary">
        <p>Content</p>
      </Section>
    );

    const section = container.firstChild as HTMLElement;
    expect(section).toHaveClass('bg-primary-50');
  });

  it('should apply vertical padding', () => {
    const { container } = render(
      <Section>
        <p>Content</p>
      </Section>
    );

    const section = container.firstChild as HTMLElement;
    expect(section).toHaveClass('py-16');
  });

  it('should accept id prop for navigation', () => {
    render(
      <Section id="about">
        <p>Content</p>
      </Section>
    );

    const section = document.getElementById('about');
    expect(section).toBeInTheDocument();
  });

  it('should accept custom className', () => {
    const { container } = render(
      <Section className="custom-section">
        <p>Content</p>
      </Section>
    );

    const section = container.firstChild as HTMLElement;
    expect(section).toHaveClass('custom-section');
  });
});
