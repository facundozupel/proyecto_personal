import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'

interface ServiceCard {
  id: number
  emoji: string
  title: string
  description: string
  color: string
}

const services: ServiceCard[] = [
  {
    id: 1,
    emoji: '🌐',
    title: 'Estrategia omnicanal real',
    description:
      'Presencia coherente en todos los puntos de contacto: web, buscadores, redes sociales, email, marketplaces y más.',
    color: 'primary',
  },
  {
    id: 2,
    emoji: '🤖',
    title: 'IA como motor de personalización y eficiencia',
    description:
      'Automatización inteligente, contenido relevante y decisiones basadas en datos en lugar de intuiciones.',
    color: 'accent',
  },
  {
    id: 3,
    emoji: '📊',
    title: 'Datos unificados y confiables',
    description:
      'Sin datos consistentes, no hay estrategia 360°. La clave está en conectar las fuentes, garantizar la calidad y respetar la privacidad.',
    color: 'success',
  },
  {
    id: 4,
    emoji: '📈',
    title: 'Medición y optimización continua',
    description:
      'Analizar, aprender y ajustar en tiempo real. Así se transforman las métricas en crecimiento sostenible.',
    color: 'gold',
  },
  {
    id: 5,
    emoji: '💡',
    title: 'Humanidad y creatividad en el centro',
    description:
      'La IA potencia la estrategia, pero la conexión real la genera tu marca. Autenticidad y propósito siguen marcando la diferencia.',
    color: 'primary',
  },
  {
    id: 6,
    emoji: '⚡',
    title: 'Capacidad interna para adaptarse y evolucionar',
    description:
      'Equipos formados, procesos claros y mentalidad ágil. Porque la tecnología cambia rápido, pero la visión estratégica debe mantenerse firme.',
    color: 'accent',
  },
]

const colorClasses: Record<string, { border: string }> = {
  primary: {
    border: 'border-primary-500',
  },
  accent: {
    border: 'border-accent-500',
  },
  success: {
    border: 'border-success-500',
  },
  gold: {
    border: 'border-gold-500',
  },
}

export function Services360() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gray-50">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <Heading level={2} className="mb-6">
              Estrategias 360° con IA: la clave para una visibilidad rentable en 2025
            </Heading>
            <div className="space-y-4 max-w-4xl mx-auto">
              <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
                En 2025, no alcanza con "estar en redes" o lanzar anuncios. Las marcas que
                realmente crecen son las que diseñan{' '}
                <strong className="text-primary-800">estrategias 360°</strong>, integrando datos,
                tecnología e inteligencia artificial para crear experiencias coherentes,
                personalizadas y medibles.
              </p>
              <p className="text-lg text-neutral-700 leading-relaxed">
                La visibilidad por sí sola ya no es suficiente. Lo que hoy importa es la{' '}
                <strong className="text-primary-800">visibilidad rentable</strong>: estar donde tu
                cliente te necesita, con el mensaje correcto, en el momento exacto… y con
                resultados que se puedan demostrar.
              </p>
            </div>
          </div>

          {/* Subtitle */}
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
              Lo que toda marca necesita para competir en la era de la IA
            </h3>
          </div>

          {/* Simple Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service) => {
              const colors = colorClasses[service.color]

              return (
                <div
                  key={service.id}
                  className={`
                    bg-white rounded-xl p-6
                    border-2 ${colors.border}
                    shadow-md
                  `}
                >
                  {/* Emoji Icon */}
                  <div className="text-4xl mb-4">{service.emoji}</div>

                  {/* Title */}
                  <h4 className="text-lg font-bold mb-3 text-neutral-900">{service.title}</h4>

                  {/* Description */}
                  <p className="text-neutral-700 leading-relaxed">{service.description}</p>
                </div>
              )
            })}
          </div>

          {/* Result Section */}
          <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 rounded-2xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">¿El resultado?</h3>
              <p className="text-xl md:text-2xl mb-6 leading-relaxed">
                Una marca que no solo alcanza visibilidad, sino que la convierte en{' '}
                <span className="text-accent-300 font-bold">rentabilidad sostenible</span> y
                diferenciadora frente a competidores fragmentados o reactivos.
              </p>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <span className="text-2xl">🚀</span>
                <span className="font-semibold">Estrategias que transforman resultados</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
