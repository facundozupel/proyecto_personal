import { useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'

/* ── Mini area-chart (SVG) ──────────────────────────────────── */
function GrowthChart({
  data,
  color,
  label,
}: {
  data: number[]
  color: string
  label: string
}) {
  const w = 320
  const h = 100
  const pad = { top: 8, bottom: 20, left: 0, right: 0 }
  const chartW = w - pad.left - pad.right
  const chartH = h - pad.top - pad.bottom

  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  const points = data.map((v, i) => ({
    x: pad.left + (i / (data.length - 1)) * chartW,
    y: pad.top + chartH - ((v - min) / range) * chartH,
  }))

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const areaPath = `${linePath} L${points[points.length - 1].x},${pad.top + chartH} L${points[0].x},${pad.top + chartH} Z`

  const last = points[points.length - 1]

  return (
    <div className="mt-2 mb-2">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxHeight: '90px' }}>
        <defs>
          <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.15} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.5, 1].map((pct) => (
          <line
            key={pct}
            x1={pad.left}
            y1={pad.top + chartH * (1 - pct)}
            x2={w - pad.right}
            y2={pad.top + chartH * (1 - pct)}
            stroke="#000"
            strokeOpacity={0.04}
            strokeWidth={0.5}
          />
        ))}

        {/* Area fill */}
        <path d={areaPath} fill={`url(#grad-${color.replace('#', '')})`} />

        {/* Line */}
        <path d={linePath} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

        {/* End dot */}
        <circle cx={last.x} cy={last.y} r={3.5} fill={color} />

        {/* Label */}
        <text x={w / 2} y={h - 2} textAnchor="middle" fontSize="9" fill="#999" fontFamily="system-ui, sans-serif">
          {label}
        </text>
      </svg>
    </div>
  )
}

/* ── Data ────────────────────────────────────────────────────── */
const studies = [
  {
    id: 'endado',
    tag: 'Endado — E-commerce / Recambios de Automóvil',
    flag: '🇪🇸',
    country: 'España',
    headline: '+560K€ en facturación orgánica',
    description: 'Un ecommerce con 100% de dependencia en Google Ads. Indexamos x12 sus productos y el canal orgánico pasó a ser el más rentable del negocio.',
    metrics: [
      { value: '+560K€', label: 'Facturación' },
      { value: 'x12', label: 'Páginas indexadas' },
      { value: '+7.000', label: 'Transacciones' },
    ],
    chart: {
      // Revenue orgánico mensual (K€) — feb 25 a nov 25
      data: [67, 72, 85, 95, 108, 120, 135, 142, 155, 160],
      color: '#BF551A',
      label: 'Revenue orgánico mensual (K€) — feb a nov 2025',
    },
    link: '/blog/caso-exit-seo-recambios-auto',
  },
  {
    id: 'moda',
    tag: 'E-commerce / Moda & Indumentaria',
    flag: '🇦🇷',
    country: 'Argentina',
    headline: 'x5 en tráfico orgánico en 5 meses',
    description: 'El 98% del tráfico venía de búsquedas de marca. Resolvimos la canibalización y pasamos a liderar el market share orgánico no-marca de la industria.',
    metrics: [
      { value: '+$42,8M', label: 'Facturación (ARS)' },
      { value: '+848%', label: 'Clics no-marca' },
      { value: '35,7%', label: 'Market share' },
    ],
    chart: {
      // Clics orgánicos totales mensuales (K) — oct 24 a feb 26
      data: [32, 34, 36, 35, 33, 34, 35, 36, 38, 40, 39, 37, 36, 42, 52, 48, 46],
      color: '#1a1a1a',
      label: 'Tráfico orgánico mensual (K clics) — oct 24 a feb 26',
    },
    link: '/blog/caso-exito-seo-moda-argentina',
  },
]

/* ── Component ───────────────────────────────────────────────── */
export default function CaseStudyPreview() {
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
    <section ref={sectionRef}>
      <Container>
        {/* Header */}
        <div className="mb-14 reveal">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-black/45 mb-4">
            Resultados reales
          </p>
          <h2 className="text-[#1a1a1a] mb-4">Casos de Éxito</h2>
          <p className="max-w-2xl text-lg text-black/45 leading-relaxed">
            No hablo de métricas vacías. Facturación, transacciones y market share medidos en Google Analytics y Search Console.
          </p>
        </div>

        {/* Cases grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {studies.map((study, idx) => (
            <a
              key={study.id}
              href={study.link}
              className="reveal group block border border-black/[0.08] rounded-2xl p-8 md:p-10 hover:border-black/20 transition-all duration-300 relative overflow-hidden"
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              {/* Top: tag + country */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-black/35">
                  {study.tag}
                </span>
                <span className="text-sm text-black/30">
                  {study.flag} {study.country}
                </span>
              </div>

              {/* Headline */}
              <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4 tracking-tight leading-tight">
                {study.headline}
              </h3>

              {/* Description */}
              <p className="text-black/45 leading-relaxed mb-6 text-[15px]">
                {study.description}
              </p>

              {/* Chart */}
              <GrowthChart
                data={study.chart.data}
                color={study.chart.color}
                label={study.chart.label}
              />

              {/* Metrics row */}
              <div className="grid grid-cols-3 gap-4 mb-8 pt-6 border-t border-black/[0.06]">
                {study.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="text-2xl md:text-3xl font-bold text-[#1a1a1a] tracking-tight mb-1">
                      {metric.value}
                    </p>
                    <p className="text-xs text-black/35 uppercase tracking-wide">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-sm font-medium text-[#BF551A] group-hover:gap-3 transition-all duration-200">
                Ver caso completo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}
