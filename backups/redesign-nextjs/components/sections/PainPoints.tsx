import { useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'

const painPoints = [
  {
    number: '01',
    title: 'Dependencia de Publicidad Paga',
    description:
      'Tu crecimiento está atado a cuánto inviertes en ads. Cuando pausas campañas, el tráfico desaparece. No hay activos digitales que generen demanda de forma constante.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Tráfico que No Convierte',
    description:
      'Tienes visitas, impresiones y clics, pero las ventas no reflejan ese volumen. No sabes qué contenido realmente genera ingresos ni cómo optimizar el embudo.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Operación Manual y Fragmentada',
    description:
      'Tu equipo pierde horas en tareas repetitivas. Los datos viven en planillas distintas, los reportes llegan tarde y las decisiones se toman con información incompleta.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function PainPoints() {
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
            El diagnóstico
          </p>
          <h2 className="text-white mb-4">¿Te suena familiar?</h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            La mayoría de las empresas enfrentan estos desafíos cuando intentan crecer orgánicamente.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {painPoints.map((point, index) => (
            <div
              key={point.number}
              className="reveal card p-8"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-6 flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/70">
                  {point.icon}
                </div>
                <span className="text-5xl font-bold text-white/[0.04]">
                  {point.number}
                </span>
              </div>

              <h3 className="mb-4 text-white">{point.title}</h3>
              <p className="text-white/50 leading-relaxed text-[15px]">{point.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center reveal">
          <p className="text-lg text-white/50">
            Si te identificas con alguno de estos problemas,{' '}
            <span className="text-white font-medium">hay una forma mejor de crecer</span>.
          </p>
        </div>
      </Container>
    </section>
  )
}
