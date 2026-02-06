import { useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'

const differentiators = [
  {
    number: '01',
    title: 'Enfocado en ROOS, no vanity metrics',
    description:
      'No mido el éxito en impresiones o rankings. Cada acción tiene un objetivo de rentabilidad. Si no impacta en el negocio, no lo hacemos.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Consultor técnico, no solo estratega',
    description:
      'Combino visión de negocio con conocimiento técnico real: Python, SQL, APIs, dashboards. Acompaño a tu equipo en el proceso técnico para asegurar una implementación correcta.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Velocidad sin burocracia',
    description:
      'Trabajo directamente con tu equipo, sin capas intermedias. Sprints cortos, iteraciones rápidas. Buscamos implementar rápido, conocer y entender por medio de los datos si nuestra estrategia funciona y avanzar.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Los datos son oro y nuestro manual',
    description:
      'Solo actuamos según el análisis de datos. Cada decisión estratégica se nutre de información real, no de suposiciones. Los datos guían el camino.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
]

export default function WhyMe() {
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section ref={sectionRef} className="py-[120px] md:py-[160px]">
      <Container>
        <div className="mb-16 text-center reveal">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/50 mb-4">
            Mi diferencial
          </p>
          <h2 className="text-white mb-4">Por qué trabajar conmigo</h2>
        </div>

        <div className="mx-auto max-w-4xl">
          {differentiators.map((item, index) => (
            <div
              key={item.number}
              className={`reveal flex gap-6 py-8 ${
                index !== differentiators.length - 1 ? 'border-b border-white/[0.08]' : ''
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.06] text-white/70">
                  {item.icon}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium text-white/30">{item.number}</span>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-white/50 leading-relaxed text-[15px]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center reveal">
          <a
            href="/quien-soy"
            className="inline-flex items-center gap-2 text-[#0070F3] font-medium hover:text-[#3291FF] transition-colors duration-150 group"
          >
            Conoce más sobre mí y mi experiencia
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </Container>
    </section>
  )
}
