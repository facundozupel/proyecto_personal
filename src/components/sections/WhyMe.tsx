import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'

const differentiators = [
  {
    number: '01',
    title: 'Enfocado en ROOS, no vanity metrics',
    description:
      'No mido el éxito en impresiones o rankings. Cada acción tiene un objetivo de rentabilidad. Si no impacta en el negocio, no lo hacemos.',
  },
  {
    number: '02',
    title: 'Consultor técnico, no solo estratega',
    description:
      'Combino visión de negocio con conocimiento técnico real: Python, SQL, APIs, dashboards. Acompaño a tu equipo en el proceso técnico para asegurar una implementación correcta.',
  },
  {
    number: '03',
    title: 'Velocidad sin burocracia',
    description:
      'Trabajo directamente con tu equipo, sin capas intermedias. Sprints cortos, iteraciones rápidas. Buscamos implementar rápido, conocer y entender por medio de los datos si nuestra estrategia funciona y avanzar.',
  },
  {
    number: '04',
    title: 'Los datos son oro y nuestro manual',
    description:
      'Solo actuamos según el análisis de datos. Cada decisión estratégica se nutre de información real, no de suposiciones. Los datos guían el camino.',
  },
]

export default function WhyMe() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary-600">
            Mi diferencial
          </p>
          <Heading level={2} className="mb-4">
            Por qué trabajar conmigo
          </Heading>
        </div>

        <div className="mx-auto max-w-4xl">
          {differentiators.map((item, index) => (
            <div
              key={item.number}
              className={`flex gap-6 py-8 ${
                index !== differentiators.length - 1 ? 'border-b border-neutral-200' : ''
              }`}
            >
              <div className="flex-shrink-0">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-700">
                  {item.number}
                </span>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-neutral-900">{item.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/quien-soy"
            className="inline-flex items-center gap-2 text-primary-700 font-medium hover:text-primary-800 transition-colors"
          >
            Conoce más sobre mí y mi experiencia
            <span>→</span>
          </a>
        </div>
      </Container>
    </section>
  )
}
