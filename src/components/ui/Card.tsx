import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({
  children,
  className = '',
  hover = true,
}: CardProps) {
  const hoverClasses = hover
    ? 'hover:-translate-y-0.5 transition-all duration-200'
    : '';

  return (
    <div
      className={`card p-6 md:p-8 ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
}
