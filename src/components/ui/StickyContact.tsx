import { useState } from 'react';
import { StickyContactButton } from './StickyContactButton';
import { ContactModal } from './ContactModal';
import { ContactTrigger } from './ContactTrigger';

export function StickyContact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <StickyContactButton />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ContactTrigger onOpenModal={() => setIsModalOpen(true)} />
    </>
  );
}
