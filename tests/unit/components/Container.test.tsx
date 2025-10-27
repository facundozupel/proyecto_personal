import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from '../../../src/components/ui/Container';

describe('Container', () => {
  it('should render children correctly', () => {
    render(
      <Container>
        <p>Test content</p>
      </Container>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should apply max-width and padding classes', () => {
    const { container } = render(
      <Container>
        <p>Content</p>
      </Container>
    );

    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass('mx-auto');
    expect(containerDiv).toHaveClass('px-4');
  });

  it('should accept custom className', () => {
    const { container } = render(
      <Container className="custom-class">
        <p>Content</p>
      </Container>
    );

    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass('custom-class');
  });

  it('should accept custom max-width via size prop', () => {
    const { container } = render(
      <Container size="sm">
        <p>Content</p>
      </Container>
    );

    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass('max-w-screen-sm');
  });

  it('should use default max-width when size is not provided', () => {
    const { container } = render(
      <Container>
        <p>Content</p>
      </Container>
    );

    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass('max-w-screen-xl');
  });
});
