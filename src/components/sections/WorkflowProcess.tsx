import { useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'

interface ProcessStep {
  id: number
  title: string
  description: string
  icon: JSX.Element
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: 'Reunión inicial',
    description:
      'Me siento con vos (o tu equipo) a entender el negocio, el nicho, los objetivos y los dolores actuales. Si no entiendo tu negocio, no puedo hacer buen SEO.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Auditoría general',
    description:
      'Analizo tu sitio, tu competencia y tu data de Search Console y GA4. El resultado: un diagnóstico claro de qué está frenando tu crecimiento orgánico y dónde están las oportunidades reales.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Roadmap estratégico',
    description:
      'Armo un plan de acción priorizado por impacto. O sea, primero lo que mueve la aguja más rápido. Objetivos claros, plazos realistas, métricas para medir si funciona.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
]

export default function WorkflowProcess() {
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
    <section ref={sectionRef} id="proceso" className="py-[120px] md:py-[160px]">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 reveal">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/50 mb-4">
              Cómo trabajo
            </p>
            <h2 className="text-white mb-6">Proceso de Trabajo</h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
              Sin vueltas. Tres pasos para pasar de diagnóstico a resultados medibles.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                className="reveal card p-8"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Step number and icon */}
                  <div className="flex items-center gap-4 md:w-64 flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/70">
                      {step.icon}
                    </div>
                    <div>
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-[#0070F3]/15 text-[#0070F3] text-xs font-semibold mb-1">
                        {step.id}
                      </span>
                      <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex-1 md:pl-6 md:border-l md:border-white/[0.08]">
                    <p className="text-white/50 leading-relaxed text-[15px]">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
