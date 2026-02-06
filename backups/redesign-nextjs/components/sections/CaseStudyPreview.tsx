import { useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'

const study = {
  client: 'Endado',
  industry: 'E-commerce / Recambios de Automóvil',
  description: 'De 100% dependencia de ads a canal orgánico rentable',
  metrics: [
    { value: '+560K€', label: 'Facturación adicional' },
    { value: '+7.000', label: 'Transacciones extra' },
    { value: '+80%', label: 'Ingresos orgánicos' },
  ],
  highlight: 'x12 en páginas indexadas (de 25K a 301K)',
  link: '/blog/caso-exito-endado-seo',
}

export default function CaseStudyPreview() {
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
            Resultados reales
          </p>
          <h2 className="text-white mb-4">Caso de Éxito</h2>
          <p className="mx-auto max-w-2xl text-lg text-white/50 leading-relaxed">
            No hablo de métricas vacías. Estos son resultados de negocio medibles.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Case header */}
          <div className="mb-10 text-center reveal">
            <p className="text-sm text-white/40 mb-3">{study.industry}</p>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{study.client}</h3>
            <p className="text-xl text-white/50">{study.description}</p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {study.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="reveal card p-8 text-center"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <p className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight">
                  {metric.value}
                </p>
                <p className="text-white/50">{metric.label}</p>
              </div>
            ))}
          </div>

          {/* Highlight + CTA */}
          <div className="reveal card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-white/[0.06] flex items-center justify-center">
                <svg className="w-6 h-6 text-[#0070F3]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-white/40 mb-1">Resultado destacado</p>
                <p className="text-lg font-semibold text-white">{study.highlight}</p>
              </div>
            </div>
            <a
              href={study.link}
              className="inline-flex items-center gap-3 px-6 py-3 bg-[#0070F3] text-white font-medium rounded-lg hover:bg-[#005AC8] transition-all duration-200"
            >
              Ver caso completo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
