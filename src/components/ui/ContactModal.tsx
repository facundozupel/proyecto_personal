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
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-modal-enter"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors"
          aria-label="Cerrar modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Progress bar */}
        <div className="h-1 bg-neutral-200">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500"
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
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900">
                  ¿En qué puedo ayudarte?
                </h2>
                <p className="text-lg text-neutral-600">
                  Selecciona el área que más te interesa
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INTERESTS.map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => handleInterestSelect(interest.id)}
                    className="group relative p-5 text-left border-2 border-neutral-200 rounded-xl hover:border-primary-500 hover:bg-primary-50/50 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl group-hover:scale-110 transition-transform">
                        {interest.emoji}
                      </span>
                      <span className="font-semibold text-neutral-800 group-hover:text-primary-700">
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
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900">
                  Dejame tus datos
                </h2>
                <p className="text-lg text-neutral-600">
                  Te responderé pronto por email
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    placeholder="tu@email.com"
                  />
                </div>

                {/* Company (optional) */}
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Empresa (opcional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    placeholder="Nombre de tu empresa"
                  />
                </div>

                {/* Message (optional) */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Mensaje (opcional)
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none"
                    placeholder="Contame brevemente qué necesitas"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    Volver
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
              <div className="w-20 h-20 mx-auto bg-success-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900">
                  ¡Mensaje enviado!
                </h2>
                <p className="text-lg text-neutral-600">
                  Gracias por tu interés
                </p>
              </div>

              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <p className="text-sm text-primary-800">
                  <strong>Importante:</strong> Revisá tu email (incluso spam) para mi respuesta.
                </p>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
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
