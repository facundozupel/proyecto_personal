import type { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

const sizeClasses = {
  1: 'text-5xl md:text-6xl lg:text-6xl font-bold',
  2: 'text-4xl md:text-5xl lg:text-6xl font-bold',
  3: 'text-3xl md:text-4xl font-bold',
  4: 'text-2xl md:text-3xl font-semibold',
  5: 'text-xl md:text-2xl font-semibold',
  6: 'text-lg md:text-xl font-medium',
};

export function Heading({ children, level, className = '' }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={`font-display text-white leading-tight ${sizeClasses[level]} ${className}`}
    >
      {children}
    </Tag>
  );
}
