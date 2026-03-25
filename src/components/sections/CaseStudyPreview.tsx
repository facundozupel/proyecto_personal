import { useEffect, useRef, useState } from 'react'
import { Container } from '@/components/ui/Container'

const studies = [
  {
    id: 'recambios',
    client: 'cliente español del rubro de recambios de auto',
    industry: 'E-commerce / Recambios de Automóvil',
    flag: '🇪🇸',
    description: 'De 100% dependencia de ads a canal orgánico rentable',
    metrics: [
      { value: '+560K€', label: 'Facturación adicional' },
      { value: '+7.000', label: 'Transacciones extra' },
      { value: '+80%', label: 'Ingresos orgánicos' },
    ],
    highlight: 'x12 en páginas indexadas (de 25K a 301K)',
    highlightDetail: 'Auditoría técnica + indexación masiva + keyword research de long-tail. Los productos que Google no veía, ahora venden.',
    link: '/blog/caso-exit-seo-recambios-auto',
  },
  {
    id: 'moda',
    client: 'ecommerce de moda en Argentina',
    industry: 'E-commerce / Moda & Indumentaria',
    flag: '🇦🇷',
    description: 'De 98% tráfico de marca a líder en market share orgánico',
    metrics: [
      { value: '+$42,8M', label: 'Facturación adicional (ARS)' },
      { value: 'x5,3', label: 'Tráfico orgánico' },
      { value: '+848%', label: 'Clics no-marca' },
    ],
    highlight: 'De 2% a 19% tráfico no-marca en 5 meses',
    highlightDetail: 'Anti-canibalización + consolidación de URLs legacy + arquitectura por intención. Solo con Fase 1 (30% del proyecto) ya lidera el market share.',
    link: '/blog/caso-exito-seo-moda-argentina',
  },
]

export default function CaseStudyPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

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

  const study = studies[active]

  return (
    <section ref={sectionRef}>
      <Container>
        <div className="mb-16 text-center reveal">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-black/45 mb-4">
            Resultados reales
          </p>
          <h2 className="text-[#1a1a1a] mb-4">Casos de Éxito</h2>
          <p className="mx-auto max-w-2xl text-lg text-black/45 leading-relaxed">
            No hablo de métricas vacías. Estos son datos reales de Google Analytics y Search Console. Facturación, transacciones, market share.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-10 reveal">
            {studies.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActive(idx)}
                className={`px-5 py-2.5 text-sm font-medium rounded-full border-2 transition-all duration-200 ${
                  active === idx
                    ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white'
                    : 'border-black/15 text-black/45 hover:border-black/30 hover:text-black/65'
                }`}
              >
                <span className="mr-2">{s.flag}</span>
                {s.industry.split(' / ')[1]}
              </button>
            ))}
          </div>

          {/* Case header */}
          <div className="mb-10 text-center reveal" key={study.id}>
            <p className="text-sm text-black/35 mb-3">{study.industry}</p>
            <h3 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4 tracking-tight">{study.client}</h3>
            <p className="text-xl text-black/45">{study.description}</p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {study.metrics.map((metric, idx) => (
              <div
                key={`${study.id}-${idx}`}
                className="reveal card p-8 text-center"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <p className="text-5xl md:text-6xl font-bold text-[#1a1a1a] mb-3 tracking-tight">
                  {metric.value}
                </p>
                <p className="text-black/45">{metric.label}</p>
              </div>
            ))}
          </div>

          {/* Highlight + CTA */}
          <div className="reveal card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-black/[0.04] flex items-center justify-center">
                <svg className="w-6 h-6 text-[#BF551A]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-black/35 mb-1">Resultado destacado</p>
                <p className="text-lg font-semibold text-[#1a1a1a]">{study.highlight}</p>
                <p className="text-sm text-black/35 mt-1">
                  {study.highlightDetail}
                </p>
              </div>
            </div>
            <a
              href={study.link}
              className="inline-flex items-center gap-3 px-6 py-3 bg-[#BF551A] text-white font-medium rounded-lg hover:bg-[#A04716] transition-all duration-200"
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
