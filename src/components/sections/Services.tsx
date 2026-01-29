import { useEffect, useRef } from 'react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'
import PillarCard from './PillarCard'

const pillars = [
  {
    icon: '📊',
    title: 'SEO Analytics & Data',
    tagline: 'Datos que impulsan decisiones',
    description:
      'Análisis profundo de rendimiento SEO y comportamiento del usuario. Transformamos datos de Search Console, GA4 y crawlers en insights accionables para escalar el canal orgánico.',
    color: 'success' as const,
    subServices: [
      { icon: '📈', text: 'Análisis de rendimiento SEO' },
      { icon: '🔍', text: 'Auditorías técnicas' },
      { icon: '📉', text: 'Tracking y atribución' },
      { icon: '🎯', text: 'Reportes ejecutivos' },
    ],
  },
  {
    icon: '🎯',
    title: 'Organic Revenue Strategy',
    tagline: 'De tráfico a ingresos',
    description:
      'Estrategias SEO diseñadas para maximizar la rentabilidad, no solo el tráfico. Cada acción está orientada a generar conversiones y retorno de inversión medible.',
    color: 'primary' as const,
    subServices: [
      { icon: '💰', text: 'SEO rentable' },
      { icon: '⚖️', text: 'Anti-canibalización' },
      { icon: '📍', text: 'SEO Local' },
      { icon: '🔍', text: 'Canales orgánicos' },
    ],
  },
  {
    icon: '📈',
    title: 'Conversion & Retention',
    tagline: 'Optimiza cada punto de contacto',
    description:
      'Análisis profundo del comportamiento del usuario para mejorar conversiones. Transformamos datos en estrategias de optimización y fidelización.',
    color: 'accent' as const,
    subServices: [
      { icon: '🔄', text: 'Funnels' },
      { icon: '🎯', text: 'CRO' },
      { icon: '🤝', text: 'Retención' },
      { icon: '💡', text: 'Nurturing' },
    ],
  },
  {
    icon: '⚡',
    title: 'Data Intelligence & Automation',
    tagline: 'Eficiencia impulsada por IA',
    description:
      'Automatización inteligente y centralización de datos para escalar operaciones. Libera tiempo de tu equipo para enfocarse en lo estratégico.',
    color: 'purple' as const,
    subServices: [
      { icon: '🗄️', text: 'Data warehouse' },
      { icon: '🤖', text: 'MCPs + IA' },
      { icon: '⚙️', text: 'Automatizaciones' },
      { icon: '📉', text: 'Dashboards' },
    ],
  },
]

export default function Services() {
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
    <section ref={sectionRef} id="servicios" className="py-20 md:py-28">
      <Container>
        {/* Introduction */}
        <div className="mb-16 text-center reveal">
          <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            La solución
          </div>
          <Heading level={2} className="text-white mb-6">
            Cuatro pilares para escalar tu negocio de forma rentable
          </Heading>
          <p className="mx-auto max-w-3xl text-lg text-white/60 leading-relaxed">
            No se trata solo de tener presencia digital, sino de convertir cada clic, cada búsqueda
            y cada interacción en resultados medibles.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {pillars.map((pillar, index) => (
            <PillarCard key={index} {...pillar} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 p-10 md:p-14 shadow-2xl reveal">
          {/* Background glows */}
          <div className="absolute right-0 top-0 w-96 h-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 -translate-x-1/2 translate-y-1/2 rounded-full bg-success-500/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 text-center">
            <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">¿El resultado?</h3>
            <p className="mb-8 text-xl leading-relaxed text-white/80 md:text-2xl max-w-2xl mx-auto">
              Una estrategia integral que no solo genera visibilidad, sino que la convierte en{' '}
              <span className="font-bold text-accent-300">rentabilidad sostenible</span>.
            </p>
            <button
              data-open-contact
              className="inline-flex cursor-pointer items-center gap-3 rounded-full bg-white/10 border border-white/20 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20 hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Agenda tu consulta gratuita</span>
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
