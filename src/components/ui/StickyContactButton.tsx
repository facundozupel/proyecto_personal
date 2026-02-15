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
      onClick={() => {
        window.dataLayer?.push({
          event: 'contact_modal_open',
          trigger_type: 'sticky_button',
        });
        onOpenModal();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        fixed bottom-6 right-6 z-50
        flex items-center gap-3
        px-6 py-4
        bg-[#0070F3]
        hover:bg-[#005AC8]
        text-white font-semibold
        rounded-lg shadow-2xl
        transition-all duration-300 ease-out
        ${isHovered ? 'scale-105' : 'scale-100'}
        cursor-pointer
        group
      `}
      aria-label="Abrir formulario de contacto"
    >
      {/* Icon */}
      <svg
        className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'rotate-12' : ''}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>

      {/* Text */}
      <span className="text-base sm:text-lg">
        ¿Hablamos?
      </span>

      {/* Pulse indicator */}
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </span>
    </button>
  );
}
