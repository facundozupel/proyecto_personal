import { useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'

const caseStudies = [
  {
    client: 'Endado',
    industry: 'E-commerce / Recambios de Automóvil',
    description: 'De 100% dependencia de ads a canal orgánico rentable',
    metrics: [
      { value: '+560K€', label: 'Facturación adicional', color: 'from-success-500/20 to-success-600/10' },
      { value: '+7.000', label: 'Transacciones extra', color: 'from-primary-500/20 to-primary-600/10' },
      { value: '+80%', label: 'Ingresos orgánicos', color: 'from-accent-500/20 to-accent-600/10' },
    ],
    highlight: 'x12 en páginas indexadas (de 25K a 301K)',
    link: '/blog/caso-exito-endado-seo',
  },
]

export default function CaseStudyPreview() {
  const study = caseStudies[0]
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
    <section ref={sectionRef} className="py-20 md:py-28 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

      <Container>
        <div className="mb-16 text-center reveal">
          <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Resultados reales
          </div>
          <Heading level={2} className="text-white mb-4">
            Caso de Éxito
          </Heading>
          <p className="mx-auto max-w-2xl text-lg text-white/60">
            No hablo de métricas vacías. Estos son resultados de negocio medibles.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Header del caso */}
          <div className="mb-10 text-center reveal">
            <p className="text-sm font-medium text-white/50 mb-3">{study.industry}</p>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">{study.client}</h3>
            <p className="text-xl text-white/70">{study.description}</p>
          </div>

          {/* Métricas destacadas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {study.metrics.map((metric, idx) => (
              <div
                key={idx}
                className={`reveal group relative rounded-2xl border border-white/[0.08] bg-gradient-to-br ${metric.color} p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-2xl`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <p className="text-5xl md:text-6xl font-bold text-white mb-3">
                  {metric.value}
                </p>
                <p className="text-white/60 font-medium">{metric.label}</p>
              </div>
            ))}
          </div>

          {/* Highlight + CTA */}
          <div className="reveal rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-success-500/20 to-success-600/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-white/50 mb-1">Resultado destacado</p>
                <p className="text-xl font-bold text-white">{study.highlight}</p>
              </div>
            </div>
            {study.link && (
              <a
                href={study.link}
                className="inline-flex items-center gap-3 px-7 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-500 hover:to-primary-600 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary-500/20"
              >
                Ver caso completo
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
