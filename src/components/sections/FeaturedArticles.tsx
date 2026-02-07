import { useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'

const articles = [
  {
    title: '¿Qué es SEO? Guía Completa de Posicionamiento Web',
    description:
      'Aprende los fundamentos del SEO, cómo funciona Google y por qué el posicionamiento orgánico es esencial para tu negocio.',
    href: '/blog/que-es-seo',
    tag: 'Fundamentos',
  },
  {
    title: 'Keyword Research: Guía de Investigación de Palabras Clave',
    description:
      'Cómo hacer keyword research paso a paso. Encuentra las palabras clave correctas para tu estrategia SEO.',
    href: '/blog/keywords-research-guia',
    tag: 'Estrategia',
  },
  {
    title: '¿Cuánto Cuesta el SEO en Chile? Precios y Planes',
    description:
      'Guía de precios de consultoría SEO en Chile. Qué esperar de una inversión en posicionamiento web.',
    href: '/blog/cuanto-cuesta-seo-chile',
    tag: 'Inversión',
  },
]

export default function FeaturedArticles() {
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
        <div className="mb-16 text-center reveal">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/50 mb-4">
            Recursos
          </p>
          <h2 className="text-white mb-4">
            Aprende sobre posicionamiento web y SEO
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/50 leading-relaxed">
            Guías prácticas basadas en experiencia real con clientes y proyectos en Chile.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {articles.map((article, idx) => (
            <a
              key={idx}
              href={article.href}
              className="reveal card p-8 group hover:border-white/15 transition-all"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <span className="text-xs font-medium text-[#0070F3] mb-4 block">
                {article.tag}
              </span>
              <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#0070F3] transition-colors">
                {article.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {article.description}
              </p>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center reveal">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
          >
            Ver todos los artículos
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </Container>
    </section>
  )
}
