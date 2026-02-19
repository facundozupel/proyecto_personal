import { useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'

const faqs = [
  {
    pregunta: '¿Cuánto tarda en verse resultados con SEO?',
    respuesta:
      'Los primeros resultados técnicos (indexación, corrección de errores) se ven en semanas. El impacto en tráfico y posiciones se nota entre 3 y 6 meses, dependiendo de la competencia y el estado inicial del sitio. El SEO genera retornos compuestos: cada mejora suma sobre la anterior.',
  },
  {
    pregunta: '¿Cuánto cuesta una consultoría SEO?',
    respuesta:
      'Depende del alcance: tamaño del sitio, competencia del sector y objetivos. Ofrezco un diagnóstico gratuito donde evaluamos tu situación y te presento una propuesta ajustada. No hay paquetes genéricos — cada proyecto tiene su precio según lo que necesita.',
  },
  {
    pregunta: '¿Trabajás con pymes o solo empresas grandes?',
    respuesta:
      'Trabajo con ambas. Para pymes, el SEO local y las long-tail keywords suelen ser el punto de partida más rentable. Para empresas más grandes, la estrategia se enfoca en escalar el canal orgánico con automatización y análisis de datos. Adapto el alcance al presupuesto.',
  },
  {
    pregunta: '¿Qué pasa si no funciona?',
    respuesta:
      'Mido todo con Google Analytics 4 y Search Console. Si algo no está funcionando, lo vemos en los datos y ajustamos. No espero 6 meses para decirte que no funcionó — itero rápido. Además, el diagnóstico inicial es gratuito: antes de invertir un peso ya sabés qué oportunidades tiene tu sitio.',
  },
  {
    pregunta: '¿Trabajás con empresas fuera de Chile?',
    respuesta:
      'Sí. Trabajo con empresas de Chile, Argentina, Perú y España. El SEO se ejecuta de forma remota sin perder calidad. Lo importante es entender el mercado local de cada cliente y adaptar la estrategia a su contexto geográfico.',
  },
]

export default function HomeFAQ() {
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
    <section ref={sectionRef} className="py-[120px] md:py-[160px]">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/50 mb-4">
              Preguntas frecuentes
            </p>
            <h2 className="text-white mb-6">Antes de que preguntes</h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
              Las dudas más comunes que recibo antes de una primera reunión.
            </p>
          </div>

          <div className="space-y-4 reveal">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="card border border-white/[0.08] group"
              >
                <summary className="p-6 cursor-pointer font-bold text-lg text-white hover:text-[#0070F3] transition-colors list-none flex items-center justify-between">
                  {faq.pregunta}
                  <span className="text-white/40 group-open:rotate-180 transition-transform ml-4 flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-white/50 leading-relaxed">{faq.respuesta}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
