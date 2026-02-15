import { useState, useEffect } from 'react';
import { WEBHOOK_URL } from '@/config/api';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormStep = 'interest' | 'details' | 'success';

const INTERESTS = [
  { id: 'seo-analytics', label: '📊 SEO Analytics & Data', emoji: '📊' },
  { id: 'organic-revenue', label: '🎯 Organic Revenue Strategy', emoji: '🎯' },
  { id: 'conversion-analytics', label: '📈 Conversion & Retention', emoji: '📈' },
  { id: 'data-automation', label: '⚡ Data Intelligence & Automation', emoji: '⚡' },
  { id: 'no-seguro', label: '🤔 No estoy seguro', emoji: '🤔' },
];

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [step, setStep] = useState<FormStep>('interest');
  const [selectedInterest, setSelectedInterest] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('interest');
        setSelectedInterest('');
        setFormData({ name: '', email: '', company: '', message: '' });
      }, 300);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
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

  const handleInterestSelect = (interestId: string) => {
    setSelectedInterest(interestId);
    window.dataLayer?.push({
      event: 'contact_form_step2',
      interest_selected: interestId,
    });
    setTimeout(() => setStep('details'), 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Enviar al webhook externo
      const webhookData = {
        nombre: formData.name,
        email: formData.email,
        empresa: formData.company || '',
        mensaje: formData.message || `Interesado en: ${selectedInterest}`,
        interes: selectedInterest,
        fecha: new Date().toISOString(),
        origen: 'Landing Page - Facundo Zupel',
      };

      const webhookResponse = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      });

      if (!webhookResponse.ok) {
        throw new Error('Error al enviar el formulario');
      }

      window.dataLayer?.push({
        event: 'contact_form_submit',
        interest_selected: selectedInterest,
      });
      setStep('success');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Hubo un error al enviar el formulario. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setStep('interest');
    setSelectedInterest('');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-black border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden animate-modal-enter"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-white/40 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
          aria-label="Cerrar modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Progress bar */}
        <div className="h-1 bg-white/[0.06]">
          <div
            className="h-full bg-[#0070F3] transition-all duration-500"
            style={{
              width: step === 'interest' ? '33%' : step === 'details' ? '66%' : '100%',
            }}
          />
        </div>

        {/* Content */}
        <div className="p-8 sm:p-10">
          {/* Step 1: Interest Selection */}
          {step === 'interest' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-2">
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  ¿En qué puedo ayudarte?
                </h2>
                <p className="text-lg text-white/50">
                  Selecciona el área que más te interesa
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INTERESTS.map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => handleInterestSelect(interest.id)}
                    className="group relative p-5 text-left border border-white/[0.08] bg-white/[0.03] rounded-lg hover:border-[#0070F3]/50 hover:bg-[#0070F3]/5 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl group-hover:scale-110 transition-transform">
                        {interest.emoji}
                      </span>
                      <span className="font-semibold text-white group-hover:text-[#3291FF]">
                        {interest.label.replace(interest.emoji, '').trim()}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Contact Details */}
          {step === 'details' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-2">
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Dejame tus datos
                </h2>
                <p className="text-lg text-white/50">
                  Te responderé pronto por email
                </p>
              </div>

              <form id="contact-lead-form" onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-white/70 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:border-[#0070F3] focus:ring-2 focus:ring-[#0070F3]/20 outline-none transition-all"
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-white/70 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:border-[#0070F3] focus:ring-2 focus:ring-[#0070F3]/20 outline-none transition-all"
                    placeholder="tu@email.com"
                  />
                </div>

                {/* Company (optional) */}
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-white/70 mb-2">
                    Empresa (opcional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:border-[#0070F3] focus:ring-2 focus:ring-[#0070F3]/20 outline-none transition-all"
                    placeholder="Nombre de tu empresa"
                  />
                </div>

                {/* Message (optional) */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-white/70 mb-2">
                    Mensaje (opcional)
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:border-[#0070F3] focus:ring-2 focus:ring-[#0070F3]/20 outline-none transition-all resize-none"
                    placeholder="Contame brevemente qué necesitas"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 px-6 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Volver
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-[#0070F3] hover:bg-[#005AC8] text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 'success' && (
            <div className="text-center space-y-6 py-8 animate-fade-in">
              <div className="w-20 h-20 mx-auto bg-green-500/10 rounded-xl flex items-center justify-center">
                <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  ¡Mensaje enviado!
                </h2>
                <p className="text-lg text-white/50">
                  Gracias por tu interés
                </p>
              </div>

              <div className="bg-[#0070F3]/10 border border-[#0070F3]/20 rounded-lg p-4">
                <p className="text-sm text-white/70">
                  <strong className="text-white">Importante:</strong> Revisá tu email (incluso spam) para mi respuesta.
                </p>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3 bg-[#0070F3] hover:bg-[#005AC8] text-white font-semibold rounded-lg transition-all duration-200"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
