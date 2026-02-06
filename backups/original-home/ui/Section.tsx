import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'primary' | 'success';
  id?: string;
}

const backgroundClasses = {
  white: 'bg-transparent',
  gray: 'bg-white/[0.02]',
  primary: 'bg-primary-900/20',
  success: 'bg-success-900/20',
};

export function Section({
  children,
  className = '',
  background = 'white',
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 lg:py-32 ${backgroundClasses[background]} ${className}`}
    >
      {children}
    </section>
  );
}
