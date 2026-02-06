import { useState, useEffect } from 'react';

interface StickyContactButtonProps {
  onOpenModal: () => void;
}

export function StickyContactButton({ onOpenModal }: StickyContactButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={onOpenModal}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        fixed bottom-6 right-6 z-50
        flex items-center gap-3
        px-6 py-4
        bg-gradient-to-r from-accent-500 to-accent-600
        hover:from-accent-600 hover:to-accent-700
        text-white font-semibold
        rounded-full shadow-2xl
        transition-all duration-300 ease-out
        ${isHovered ? 'scale-110 shadow-accent-500/50' : 'scale-100'}
        hover:shadow-accent-500/30
        cursor-pointer
        group
        animate-bounce-subtle
      `}
      aria-label="Abrir formulario de contacto"
    >
      {/* Icon */}
      <svg
        className={`w-6 h-6 transition-transform duration-300 ${isHovered ? 'rotate-12' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>

      {/* Text */}
      <span className="font-display text-base sm:text-lg">
        ¿Hablamos?
      </span>

      {/* Pulse indicator */}
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-success-500"></span>
      </span>
    </button>
  );
}
