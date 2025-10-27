import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'default' | 'primary' | 'success' | 'accent';
}

const variantClasses = {
  default: 'border-neutral-200',
  primary: 'border-t-4 border-t-primary-800 border-x-neutral-200 border-b-neutral-200',
  success: 'border-t-4 border-t-success-600 border-x-neutral-200 border-b-neutral-200',
  accent: 'border-t-4 border-t-accent-500 border-x-neutral-200 border-b-neutral-200',
};

export function Card({
  children,
  className = '',
  hover = true,
  variant = 'default',
}: CardProps) {
  const hoverClasses = hover
    ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300'
    : '';
  const variantClass = variantClasses[variant];

  return (
    <div
      className={`bg-white border rounded-lg p-6 md:p-8 shadow-sm ${variantClass} ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
}
