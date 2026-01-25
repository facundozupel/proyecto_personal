import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'

const painPoints = [
  {
    number: '01',
    title: 'Dependencia de Publicidad Paga',
    description:
      'Tu crecimiento está atado a cuánto inviertes en ads. Cuando pausas campañas, el tráfico desaparece. No hay activos digitales que generen demanda de forma constante.',
    icon: '💸',
  },
  {
    number: '02',
    title: 'Tráfico que No Convierte',
    description:
      'Tienes visitas, impresiones y clics, pero las ventas no reflejan ese volumen. No sabes qué contenido realmente genera ingresos ni cómo optimizar el embudo.',
    icon: '📉',
  },
  {
    number: '03',
    title: 'Operación Manual y Fragmentada',
    description:
      'Tu equipo pierde horas en tareas repetitivas. Los datos viven en planillas distintas, los reportes llegan tarde y las decisiones se toman con información incompleta.',
    icon: '⏳',
  },
]

export default function PainPoints() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary-600">
            El diagnóstico
          </p>
          <Heading level={2}>
            ¿Te suena familiar?
          </Heading>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {painPoints.map((point) => (
            <div
              key={point.number}
              className="group relative rounded-xl border border-neutral-200 bg-gray-50 p-6 transition-all hover:border-primary-300 hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between">
                <span className="text-4xl">{point.icon}</span>
                <span className="text-5xl font-bold text-neutral-200 group-hover:text-primary-100">
                  {point.number}
                </span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-primary-900">{point.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-neutral-700">
            Si te identificas con alguno de estos problemas,{' '}
            <span className="font-semibold text-primary-700">hay una forma mejor de crecer</span>.
          </p>
        </div>
      </Container>
    </section>
  )
}
