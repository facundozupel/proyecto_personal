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
      setState('success')
      setEmail('')
      setName('')
    } catch {
      setState('error')
    }
  }

  return (
    <div ref={sectionRef} className="mt-12 max-w-xl mx-auto reveal">
      <div className="card border border-white/[0.08] p-8">
        {state === 'success' ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white font-semibold text-lg mb-2">¡Recibido!</p>
            <p className="text-white/50 text-sm">Te escribo en las próximas 24hs para coordinar el diagnóstico.</p>
          </div>
        ) : (
          <>
            <p className="text-white/50 text-sm text-center mb-6">
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
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-[#0070F3] focus:border-[#0070F3] transition-colors outline-none text-sm"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-[#0070F3] focus:border-[#0070F3] transition-colors outline-none text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={state === 'submitting'}
                className="w-full bg-[#0070F3] hover:bg-[#005AC8] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-lg transition-all duration-200 text-sm"
              >
                {state === 'submitting' ? 'Enviando...' : 'Quiero mi diagnóstico gratuito'}
              </button>
              {state === 'error' && (
                <p className="text-red-400 text-xs text-center">Algo falló. Intentá de nuevo o escribime directo.</p>
              )}
            </form>
            <p className="text-white/30 text-xs text-center mt-4">
              Sin spam. Solo te contacto para coordinar la reunión.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
