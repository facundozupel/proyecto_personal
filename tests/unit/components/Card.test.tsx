import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../../../src/components/ui/Card';

describe('Card', () => {
  it('should render children correctly', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    );

    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('should apply base card styles', () => {
    const { container } = render(
      <Card>
        <p>Content</p>
      </Card>
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('bg-white');
    expect(card).toHaveClass('rounded-lg');
  });

  it('should apply hover effect by default', () => {
    const { container } = render(
      <Card>
        <p>Content</p>
      </Card>
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('hover:shadow-lg');
  });

  it('should not apply hover effect when hover is false', () => {
    const { container } = render(
      <Card hover={false}>
        <p>Content</p>
      </Card>
    );

    const card = container.firstChild as HTMLElement;
    expect(card).not.toHaveClass('hover:shadow-lg');
  });

  it('should accept custom className', () => {
    const { container } = render(
      <Card className="custom-card">
        <p>Content</p>
      </Card>
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('custom-card');
  });

  it('should apply correct padding', () => {
    const { container } = render(
      <Card>
        <p>Content</p>
      </Card>
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('p-6');
  });

  it('should support variant prop for different border colors', () => {
    const { container } = render(
      <Card variant="primary">
        <p>Content</p>
      </Card>
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('border-t-primary-800');
  });
});
