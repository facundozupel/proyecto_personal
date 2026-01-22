import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'
import PillarCard from './PillarCard'

const pillars = [
  {
    icon: '🎯',
    title: 'Organic Revenue Strategy',
    tagline: 'De tráfico a ingresos',
    description:
      'Estrategias SEO diseñadas para maximizar la rentabilidad, no solo el tráfico. Cada acción está orientada a generar conversiones y retorno de inversión medible.',
    color: 'primary' as const,
    subServices: [
      { icon: '💰', text: 'SEO orientado a rentabilidad' },
      { icon: '⚖️', text: 'Anti-canibalización SEO/SEM' },
      { icon: '📍', text: 'SEO Local' },
      { icon: '🔍', text: 'Canales orgánicos rentables' },
    ],
  },
  {
    icon: '📊',
    title: 'Conversion & Retention Analytics',
    tagline: 'Datos que impulsan decisiones',
    description:
      'Análisis profundo del comportamiento del usuario para optimizar cada punto de contacto. Transformamos datos en estrategias de conversión y fidelización.',
    color: 'success' as const,
    subServices: [
      { icon: '🔄', text: 'Funnels de conversión' },
      { icon: '📈', text: 'CRO (Optimización de conversiones)' },
      { icon: '🤝', text: 'Estrategias de retención' },
      { icon: '🎯', text: 'Generación y nurturing de leads' },
    ],
  },
  {
    icon: '⚡',
    title: 'Data Intelligence & Automation',
    tagline: 'Eficiencia impulsada por IA',
    description:
      'Automatización inteligente y centralización de datos para escalar operaciones. Libera tiempo de tu equipo para enfocarse en lo estratégico.',
    color: 'accent' as const,
    subServices: [
      { icon: '🗄️', text: 'Data warehouse y unificación de fuentes' },
      { icon: '🤖', text: 'MCPs + IA para análisis avanzado' },
      { icon: '⚙️', text: 'Automatizaciones de procesos' },
      { icon: '📉', text: 'Dashboards personalizados' },
    ],
  },
]

export default function Services() {
  return (
    <Section id="servicios" background="gray">
      <Container>
        {/* Introduction */}
        <div className="mb-12 text-center md:mb-16">
          <Heading level={2} className="mb-6">
            Tres pilares para escalar tu negocio de forma rentable
          </Heading>
          <p className="mx-auto max-w-4xl text-lg text-neutral-600 leading-relaxed md:text-xl">
            No se trata solo de tener presencia digital, sino de convertir cada clic, cada búsqueda
            y cada interacción en resultados medibles.
          </p>
          <p className="mx-auto mt-4 max-w-4xl font-semibold text-primary-700 md:text-lg">
            Nuestra consultoría combina estrategia, tecnología e inteligencia artificial para
            potenciar el crecimiento de tu marca.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {pillars.map((pillar, index) => (
            <PillarCard key={index} {...pillar} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative mt-12 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 p-8 text-white shadow-2xl md:mt-16 md:p-12">
          {/* Background decoration */}
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 -translate-x-1/2 translate-y-1/2 rounded-full bg-accent-500/10 blur-2xl" />

          <div className="relative z-10 text-center">
            <h3 className="mb-4 text-2xl font-bold md:text-3xl">¿El resultado?</h3>
            <p className="mb-6 text-xl leading-relaxed md:text-2xl">
              Una estrategia integral que no solo genera visibilidad, sino que la convierte en{' '}
              <span className="font-bold text-accent-300">rentabilidad sostenible</span>.
            </p>
            <button
              data-open-contact
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 font-semibold backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20"
            >
              <span className="text-xl">🚀</span>
              <span>Agenda tu consulta gratuita</span>
            </button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
