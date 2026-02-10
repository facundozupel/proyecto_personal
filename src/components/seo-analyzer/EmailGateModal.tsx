import { useState, useEffect } from 'react';

interface EmailGateModalProps {
  isOpen: boolean;
  onSubmit: (email: string, nombre: string, objetivo: string) => void;
  onClose: () => void;
  mandatory?: boolean;
}

export function EmailGateModal({ isOpen, onSubmit, onClose, mandatory = false }: EmailGateModalProps) {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !nombre.trim()) return;
    setIsSubmitting(true);
    await onSubmit(email.trim(), nombre.trim(), objetivo.trim());
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={mandatory ? undefined : onClose}
    >
      <div
        className="relative w-full max-w-md bg-black border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {!mandatory && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-white/40 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
            aria-label="Cerrar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <div className="p-8">
          <div className="text-center space-y-2 mb-6">
            <div className="w-14 h-14 mx-auto bg-[#0070F3]/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-[#0070F3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {mandatory ? 'Tu diagnostico esta listo' : 'Seguir chateando'}
            </h2>
            <p className="text-white/50 text-sm">
              {mandatory
                ? 'Dejanos tus datos para ver el analisis completo y que podamos ayudarte.'
                : 'Deja tu email para seguir haciendo preguntas y recibir el reporte completo.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="gate-nombre" className="block text-sm font-semibold text-white/70 mb-2">
                Nombre *
              </label>
              <input
                type="text"
                id="gate-nombre"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:border-[#0070F3] focus:ring-2 focus:ring-[#0070F3]/20 outline-none transition-all"
                placeholder="Tu nombre"
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="gate-email" className="block text-sm font-semibold text-white/70 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="gate-email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:border-[#0070F3] focus:ring-2 focus:ring-[#0070F3]/20 outline-none transition-all"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="gate-objetivo" className="block text-sm font-semibold text-white/70 mb-2">
                Que te gustaria mejorar del SEO de tu sitio?
              </label>
              <textarea
                id="gate-objetivo"
                value={objetivo}
                onChange={(e) => setObjetivo(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:border-[#0070F3] focus:ring-2 focus:ring-[#0070F3]/20 outline-none transition-all resize-none"
                placeholder="Ej: Aparecer en Google, mas trafico, mejorar conversiones..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !email.trim() || !nombre.trim()}
              className="w-full px-6 py-3.5 bg-[#0070F3] hover:bg-[#005AC8] text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : mandatory ? 'Ver mi diagnostico' : 'Continuar analizando'}
            </button>
          </form>

          <p className="text-white/25 text-xs text-center mt-4">
            No spam. Solo recibiras informacion de SEO relevante.
          </p>
        </div>
      </div>
    </div>
  );
}
