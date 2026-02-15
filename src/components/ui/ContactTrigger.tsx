import { useEffect } from 'react';

interface ContactTriggerProps {
  onOpenModal: () => void;
}

/**
 * Componente invisible que escucha clicks en elementos con data-open-contact
 * para abrir el modal de contacto desde cualquier parte de la página
 */
export function ContactTrigger({ onOpenModal }: ContactTriggerProps) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const trigger = target.closest('[data-open-contact]');

      if (trigger) {
        e.preventDefault();
        window.dataLayer?.push({
          event: 'contact_modal_open',
          trigger_type: 'inline_cta',
        });
        onOpenModal();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [onOpenModal]);

  return null; // No renderiza nada
}
