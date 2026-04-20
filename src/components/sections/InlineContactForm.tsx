import { useState, useRef, useEffect } from 'react'
import { WEBHOOK_URL } from '@/config/api'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function InlineContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<FormState>('idle')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('active'))
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name) return

    setState('submitting')
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: name,
          email,
          interes: 'diagnostico-home-inline',
          fuente: 'home-inline-form',
        }),
      })
      try {
        window.posthog?.identify(email, { email, name })
        window.posthog?.capture('inline_contact_form_submitted', {
          source: 'home_inline',
        })
      } catch {}
      setState('success')
      setEmail('')
      setName('')
    } catch {
      setState('error')
    }
  }

  return (
    <div ref={sectionRef} className="mt-12 max-w-xl mx-auto reveal">
      <div className="card border border-black/[0.1] p-8">
        {state === 'success' ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-[#1a1a1a] font-semibold text-lg mb-2">¡Recibido!</p>
            <p className="text-black/45 text-sm">Te escribo en las próximas 24hs para coordinar el diagnóstico.</p>
          </div>
        ) : (
          <>
            <p className="text-black/45 text-sm text-center mb-6">
              Dejame tu nombre y email — te contacto para agendar el diagnóstico gratuito.
            </p>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  required
                  className="w-full px-4 py-3 bg-white border border-black/[0.1] rounded-lg text-[#1a1a1a] placeholder-black/30 focus:ring-2 focus:ring-[#BF551A] focus:border-[#BF551A] transition-colors outline-none text-sm"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full px-4 py-3 bg-white border border-black/[0.1] rounded-lg text-[#1a1a1a] placeholder-black/30 focus:ring-2 focus:ring-[#BF551A] focus:border-[#BF551A] transition-colors outline-none text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={state === 'submitting'}
                className="w-full bg-[#BF551A] hover:bg-[#A04716] disabled:opacity-60 disabled:cursor-not-allowed text-[#1a1a1a] font-medium py-3.5 rounded-lg transition-all duration-200 text-sm"
              >
                {state === 'submitting' ? 'Enviando...' : 'Quiero mi diagnóstico gratuito'}
              </button>
              {state === 'error' && (
                <p className="text-red-400 text-xs text-center">Algo falló. Intentá de nuevo o escribime directo.</p>
              )}
            </form>
            <p className="text-black/25 text-xs text-center mt-4">
              Sin spam. Solo te contacto para coordinar la reunión.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
