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
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={mandatory ? undefined : onClose}
    >
      <div
        className="relative w-full max-w-sm bg-black border border-white/[0.08] rounded-xl shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {!mandatory && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-1.5 text-white/40 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
            aria-label="Cerrar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <div className="p-6">
          <div className="text-center space-y-1 mb-5">
            <div className="w-11 h-11 mx-auto bg-[#0070F3]/10 rounded-xl flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-[#0070F3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {mandatory ? 'Tu diagn\u00f3stico est\u00e1 listo' : 'Seguir chateando'}
            </h2>
            <p className="text-white/50 text-sm">
              {mandatory
                ? 'Dejanos tus datos para ver el an\u00e1lisis completo y que podamos ayudarte.'
                : 'Deja tu email para seguir haciendo preguntas y recibir el reporte completo.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="gate-nombre" className="block text-sm font-semibold text-white/70 mb-1.5">
                Nombre *
              </label>
              <input
                type="text"
                id="gate-nombre"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-lg text-white text-sm placeholder-white/30 focus:border-[#0070F3] focus:ring-2 focus:ring-[#0070F3]/20 outline-none transition-all"
                placeholder="Tu nombre"
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="gate-email" className="block text-sm font-semibold text-white/70 mb-1.5">
                Email *
              </label>
              <input
                type="email"
                id="gate-email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-lg text-white text-sm placeholder-white/30 focus:border-[#0070F3] focus:ring-2 focus:ring-[#0070F3]/20 outline-none transition-all"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="gate-objetivo" className="block text-sm font-semibold text-white/70 mb-1.5">
                {'\u00bfQu\u00e9 te gustar\u00eda mejorar del SEO de tu sitio?'}
              </label>
              <textarea
                id="gate-objetivo"
                value={objetivo}
                onChange={(e) => setObjetivo(e.target.value)}
                rows={2}
                className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-lg text-white text-sm placeholder-white/30 focus:border-[#0070F3] focus:ring-2 focus:ring-[#0070F3]/20 outline-none transition-all resize-none"
                placeholder="Ej: Aparecer en Google, m\u00e1s tr\u00e1fico, mejorar conversiones..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !email.trim() || !nombre.trim()}
              className="w-full px-5 py-3 bg-[#0070F3] hover:bg-[#005AC8] text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isSubmitting ? 'Enviando...' : mandatory ? 'Ver mi diagn\u00f3stico' : 'Continuar analizando'}
            </button>
          </form>

          <p className="text-white/25 text-xs text-center mt-3">
            No spam. Solo recibir\u00e1s informaci\u00f3n de SEO relevante.
          </p>
        </div>
      </div>
    </div>
  );
}
