import { useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'

const painPoints = [
  {
    number: '01',
    title: 'Dependencia de Publicidad Paga',
    description:
      'Tu crecimiento está atado a cuánto inviertes en ads. Cuando pausas campañas, el tráfico desaparece. No hay activos digitales que generen demanda de forma constante.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Tráfico que No Convierte',
    description:
      'Tienes visitas, impresiones y clics, pero las ventas no reflejan ese volumen. No sabes qué contenido realmente genera ingresos ni cómo optimizar el embudo.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Operación Manual y Fragmentada',
    description:
      'Tu equipo pierde horas en tareas repetitivas. Los datos viven en planillas distintas, los reportes llegan tarde y las decisiones se toman con información incompleta.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function PainPoints() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Mouse tracking for spotlight effect
    const handleMouseMove = (e: MouseEvent, card: HTMLDivElement) => {
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      card.style.setProperty('--mouse-x', `${x}%`)
      card.style.setProperty('--mouse-y', `${y}%`)
    }

    cardsRef.current.forEach((card) => {
      if (card) {
        card.addEventListener('mousemove', (e) => handleMouseMove(e, card))
      }
    })

    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1 }
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="mb-16 text-center reveal" ref={(el) => { if (el) cardsRef.current.push(el as unknown as HTMLDivElement) }}>
          <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            El diagnóstico
          </div>
          <Heading level={2} className="text-white mb-4">
            ¿Te suena familiar?
          </Heading>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            La mayoría de las empresas enfrentan estos desafíos cuando intentan crecer orgánicamente.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {painPoints.map((point, index) => (
            <div
              key={point.number}
              ref={(el) => { cardsRef.current[index + 1] = el }}
              className="reveal card-spotlight group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 transition-all duration-500 hover:border-accent-500/30 hover:bg-white/[0.05] hover:-translate-y-3 hover:shadow-2xl"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Top bar animation */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-accent-500 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

              <div className="mb-6 flex items-start justify-between">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center text-red-400">
                  {point.icon}
                </div>
                <span className="text-6xl font-bold text-white/[0.05] group-hover:text-accent-500/10 transition-colors">
                  {point.number}
                </span>
              </div>

              <h3 className="mb-4 text-xl font-bold text-white">{point.title}</h3>
              <p className="text-white/60 leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center reveal" ref={(el) => { if (el) cardsRef.current.push(el as unknown as HTMLDivElement) }}>
          <p className="text-lg text-white/70">
            Si te identificas con alguno de estos problemas,{' '}
            <span className="font-semibold text-accent-400">hay una forma mejor de crecer</span>.
          </p>
        </div>
      </Container>
    </section>
  )
}
