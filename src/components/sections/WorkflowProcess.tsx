import { useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'

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
      'Conocemos tu negocio, nicho específico, objetivos y desafíos actuales para entender exactamente qué necesitas.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Auditoría general',
    description:
      'Analizamos tu presencia digital, procesos y competencia para identificar oportunidades enfocadas en resultados medibles.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Roadmap estratégico',
    description:
      'Diseñamos un plan de acción priorizado según el potencial de rentabilidad más pronta posible, con objetivos claros y plazos realistas.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
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
            const reveals = entry.target.querySelectorAll('.reveal')
            reveals.forEach((el) => el.classList.add('active'))
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="proceso" className="py-20 md:py-28">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 reveal">
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Cómo trabajamos
            </div>
            <Heading level={2} className="text-white mb-6">
              Proceso de Trabajo
            </Heading>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Un enfoque claro y estructurado para maximizar resultados desde el primer día
            </p>
          </div>

          {/* Process Steps */}
          <div className="space-y-6">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                className="reveal group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 transition-all duration-500 hover:border-white/15 hover:bg-white/[0.04]"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Step number and icon */}
                  <div className="flex items-center gap-4 md:w-64 flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 flex items-center justify-center text-primary-400 group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                    <div>
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent-500/20 text-accent-400 text-sm font-bold mb-1">
                        {step.id}
                      </span>
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex-1 md:pl-6 md:border-l md:border-white/[0.08]">
                    <p className="text-white/60 leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Connection line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute left-[4.5rem] -bottom-6 w-px h-6 bg-gradient-to-b from-white/10 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
