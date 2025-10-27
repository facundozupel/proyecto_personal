import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'
import ServiceCard from './ServiceCard'

export default function Services() {
  const services = [
    {
      icon: '🗺️',
      title: 'SEO Local',
      description:
        'Aparecé donde tus clientes te buscan. Optimizamos tu posicionamiento en mapas y búsquedas locales para aumentar tráfico cualificado y generar más visitas y ventas en tu zona.',
    },
    {
      icon: '⚙️',
      title: 'Automatización de procesos internos',
      description:
        'Reducí costos y ganá eficiencia. Diseñamos flujos automáticos que eliminan tareas repetitivas y mejoran la productividad de tu equipo, liberando tiempo para enfocarte en lo que realmente genera valor.',
    },
    {
      icon: '📧',
      title: 'Email Marketing inteligente',
      description:
        'Conectá con tus leads y clientes de forma personalizada. Creamos campañas automatizadas que impulsan la conversión y fidelización, con foco en datos y segmentación efectiva.',
    },
    {
      icon: '🔧',
      title: 'SEO Técnico',
      description:
        'Optimizamos la base de tu sitio para que Google lo ame. Mejoramos velocidad, estructura, indexación y usabilidad, asegurando que tu web rinda al máximo.',
    },
    {
      icon: '📱',
      title: 'Estrategias de contenido para RRSS y YouTube',
      description:
        'Transformamos tu contenido en una herramienta de atracción y conversión. Creamos estrategias que combinan storytelling, posicionamiento y analítica para amplificar tu alcance y fortalecer tu marca.',
    },
  ]

  return (
    <Section id="servicios" background="gray">
      <Container>
        {/* Introduction */}
        <div className="mb-12 text-center md:mb-16">
          <Heading level={2} className="mb-6">
            Aumentá tu ROI con estrategias que generan resultados reales 🚀
          </Heading>
          <p className="mx-auto max-w-4xl text-lg text-neutral-600 leading-relaxed md:text-xl">
            No se trata solo de tener presencia digital, sino de convertir cada clic, cada
            búsqueda y cada interacción en resultados medibles.
            <br />
            <span className="mt-2 block font-semibold text-primary-700">
              Nuestra consultoría combina estrategia, tecnología y ejecución para potenciar el
              crecimiento de tu marca y maximizar el retorno de inversión.
            </span>
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* Conclusion */}
        <div className="mt-12 rounded-2xl border-2 border-accent-200 bg-accent-50 p-8 text-center md:mt-16 md:p-12">
          <p className="mb-2 text-2xl font-bold text-neutral-900 md:text-3xl">
            📈 El resultado:
          </p>
          <p className="text-xl font-semibold text-primary-700 md:text-2xl">
            más visibilidad, más eficiencia, más conversiones.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-neutral-600 md:text-lg">
            Porque cuando cada parte de tu estrategia está alineada, el ROI se multiplica.
          </p>
        </div>
      </Container>
    </Section>
  )
}
