import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer';
}

const sizeClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-[1440px]',
  full: 'max-w-full',
};

export function Container({
  children,
  className = '',
  size = 'xl',
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component className={`mx-auto px-6 md:px-10 lg:px-16 ${sizeClasses[size]} ${className}`}>
      {children}
    </Component>
  );
}
