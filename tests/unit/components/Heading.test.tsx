import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Heading } from '../../../src/components/ui/Heading';

describe('Heading', () => {
  it('should render h1 when level is 1', () => {
    render(<Heading level={1}>Heading 1</Heading>);

    const heading = screen.getByText('Heading 1');
    expect(heading.tagName).toBe('H1');
  });

  it('should render h2 when level is 2', () => {
    render(<Heading level={2}>Heading 2</Heading>);

    const heading = screen.getByText('Heading 2');
    expect(heading.tagName).toBe('H2');
  });

  it('should render h3 when level is 3', () => {
    render(<Heading level={3}>Heading 3</Heading>);

    const heading = screen.getByText('Heading 3');
    expect(heading.tagName).toBe('H3');
  });

  it('should apply correct text size for h1', () => {
    render(<Heading level={1}>Large Heading</Heading>);

    const heading = screen.getByText('Large Heading');
    expect(heading).toHaveClass('text-5xl');
  });

  it('should apply correct text size for h2', () => {
    render(<Heading level={2}>Medium Heading</Heading>);

    const heading = screen.getByText('Medium Heading');
    expect(heading).toHaveClass('text-4xl');
  });

  it('should apply font-display family', () => {
    render(<Heading level={1}>Styled Heading</Heading>);

    const heading = screen.getByText('Styled Heading');
    expect(heading).toHaveClass('font-display');
  });

  it('should apply neutral-900 color', () => {
    render(<Heading level={1}>Colored Heading</Heading>);

    const heading = screen.getByText('Colored Heading');
    expect(heading).toHaveClass('text-neutral-900');
  });

  it('should accept custom className', () => {
    render(
      <Heading level={1} className="custom-heading">
        Custom Heading
      </Heading>
    );

    const heading = screen.getByText('Custom Heading');
    expect(heading).toHaveClass('custom-heading');
  });
});
