import { useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'
import PillarCard from './PillarCard'

const pillars = [
  {
    icon: '📊',
    title: 'SEO Analytics & Data',
    tagline: 'Datos que impulsan decisiones',
    description:
      'Análisis profundo de rendimiento SEO con Google Search Console, GA4 y crawlers como Screaming Frog. Transformamos datos en insights accionables para escalar el tráfico orgánico.',
    color: 'success' as const,
    href: '/auditoria-seo-chile',
    linkText: 'Conoce nuestra auditoría SEO',
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
    tagline: 'De tráfico orgánico a ingresos',
    description:
      'Estrategias de posicionamiento web diseñadas para maximizar la rentabilidad. Keyword research, optimización on-page y estrategia de contenido orientada a conversión desde orgánico.',
    color: 'primary' as const,
    href: '/estrategia-seo',
    linkText: 'Ver estrategia SEO',
    subServices: [
      { icon: '💰', text: 'SEO rentable (ROOS)' },
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
      'Análisis del comportamiento del usuario para mejorar la conversión desde orgánico. CRO, funnels y estrategias de retención basadas en datos de GA4 y herramientas de analytics.',
    color: 'accent' as const,
    href: '/consultoria-seo-mensual',
    linkText: 'Conoce la consultoría mensual',
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
      'Automatización inteligente con Python, APIs y MCPs para escalar operaciones SEO. Desde scripts de keyword research hasta dashboards de rendimiento orgánico en tiempo real.',
    color: 'purple' as const,
    href: '/seo-tecnico',
    linkText: 'Ver SEO técnico',
    subServices: [
      { icon: '🗄️', text: 'Data warehouse' },
      { icon: '🤖', text: 'MCPs + IA' },
      { icon: '⚙️', text: 'Automatizaciones Python' },
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
    <section ref={sectionRef} id="servicios" className="py-[120px] md:py-[160px]">
      <Container>
        {/* Header */}
        <div className="mb-16 text-center reveal">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/50 mb-4">
            La solución
          </p>
          <h2 className="text-white mb-6">
            Cuatro pilares para escalar tu negocio
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-white/50 leading-relaxed">
            No se trata solo de tener presencia digital, sino de convertir cada clic, cada búsqueda
            y cada interacción en resultados medibles.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <PillarCard key={index} {...pillar} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 card p-10 md:p-14 text-center reveal">
          <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl tracking-tight">¿El resultado?</h3>
          <p className="mb-8 text-xl leading-relaxed text-white/50 md:text-2xl max-w-2xl mx-auto">
            Una estrategia integral que convierte visibilidad en{' '}
            <span className="text-white font-medium">rentabilidad sostenible</span>.
          </p>
          <button
            data-open-contact
            className="inline-flex cursor-pointer items-center gap-3 px-8 py-3.5 border border-white/[0.2] rounded-lg font-medium text-white hover:bg-white/[0.05] hover:border-white/30 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Agenda tu consulta gratuita</span>
          </button>

          {/* Quick links a servicios */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
            <a href="/consultor-seo-chile" className="text-sm text-white/40 hover:text-white/70 transition-colors">
              Consultor SEO Chile
            </a>
            <a href="/seo-ecommerce" className="text-sm text-white/40 hover:text-white/70 transition-colors">
              SEO para Ecommerce
            </a>
            <a href="/seo-local-chile" className="text-sm text-white/40 hover:text-white/70 transition-colors">
              SEO Local Chile
            </a>
            <a href="/posicionamiento-web-chile" className="text-sm text-white/40 hover:text-white/70 transition-colors">
              Posicionamiento Web Chile
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
