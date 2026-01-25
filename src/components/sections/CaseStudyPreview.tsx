import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'

const caseStudies = [
  {
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
  },
]

export default function CaseStudyPreview() {
  const study = caseStudies[0]

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <Container>
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary-600">
            Resultados reales
          </p>
          <Heading level={2} className="mb-4">
            Caso de Éxito
          </Heading>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600">
            No hablo de métricas vacías. Estos son resultados de negocio medibles.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Header del caso */}
          <div className="mb-8 text-center">
            <p className="text-sm font-medium text-neutral-500 mb-2">{study.industry}</p>
            <h3 className="text-3xl md:text-4xl font-bold text-primary-900 mb-3">{study.client}</h3>
            <p className="text-xl text-neutral-600">{study.description}</p>
          </div>

          {/* Métricas destacadas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {study.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-neutral-200 p-8 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-4xl md:text-5xl font-bold text-primary-700 mb-2">
                  {metric.value}
                </p>
                <p className="text-neutral-600 font-medium">{metric.label}</p>
              </div>
            ))}
          </div>

          {/* Highlight + CTA */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-4xl">📈</span>
              <div>
                <p className="text-sm text-neutral-500 mb-1">Resultado destacado</p>
                <p className="text-xl font-bold text-primary-900">{study.highlight}</p>
              </div>
            </div>
            {study.link && (
              <a
                href={study.link}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors"
              >
                Ver caso completo
                <span>→</span>
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
