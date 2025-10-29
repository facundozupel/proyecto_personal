import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'

interface ProcessStep {
  id: number
  title: string
  description: string
  icon: string
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: 'Reunión inicial',
    description:
      'Conocemos tu negocio, nicho específico, objetivos y desafíos actuales para entender exactamente qué necesitas.',
    icon: '🤝',
  },
  {
    id: 2,
    title: 'Auditoría general',
    description:
      'Analizamos tu presencia digital, procesos y competencia para identificar oportunidades enfocadas en resultados medibles.',
    icon: '🔍',
  },
  {
    id: 3,
    title: 'Roadmap estratégico',
    description:
      'Diseñamos un plan de acción priorizado según el potencial de rentabilidad más pronta posible, con objetivos claros y plazos realistas.',
    icon: '📋',
  },
]

export default function WorkflowProcess() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <Heading level={2} className="mb-6">
              Proceso de Trabajo
            </Heading>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
              Un enfoque claro y estructurado para maximizar resultados desde el primer día
            </p>
          </div>

          {/* Process Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary-900 text-white">
                  <th className="py-4 px-6 text-left font-bold text-lg border-b-2 border-primary-700">
                    Fase
                  </th>
                  <th className="py-4 px-6 text-left font-bold text-lg border-b-2 border-primary-700">
                    Qué hacemos
                  </th>
                </tr>
              </thead>
              <tbody>
                {processSteps.map((step, index) => (
                  <tr
                    key={step.id}
                    className={`
                      ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                      hover:bg-primary-50 transition-colors
                    `}
                  >
                    <td className="py-6 px-6 border-b border-neutral-200">
                      <div className="flex items-start gap-4">
                        <span className="text-4xl flex-shrink-0">{step.icon}</span>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary-600 text-white text-sm font-bold">
                              {step.id}
                            </span>
                            <h3 className="text-xl font-bold text-primary-900">{step.title}</h3>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-6 border-b border-neutral-200">
                      <p className="text-neutral-700 leading-relaxed">{step.description}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  )
}
