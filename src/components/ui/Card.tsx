import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'default' | 'primary' | 'success' | 'accent';
}

const variantClasses = {
  default: 'border-white/10',
  primary: 'border-t-4 border-t-primary-500 border-x-white/10 border-b-white/10',
  success: 'border-t-4 border-t-success-500 border-x-white/10 border-b-white/10',
  accent: 'border-t-4 border-t-accent-500 border-x-white/10 border-b-white/10',
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
      className={`glass border rounded-lg p-6 md:p-8 ${variantClass} ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
}
