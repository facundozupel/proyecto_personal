interface SubService {
  icon: string
  text: string
}

interface PillarCardProps {
  icon: string
  title: string
  tagline: string
  description: string
  subServices: SubService[]
  color: 'primary' | 'success' | 'accent' | 'purple'
  index?: number
}

const iconSvgs: Record<string, JSX.Element> = {
  '📊': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  '🎯': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  '📈': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  '⚡': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
}

export default function PillarCard({
  icon,
  title,
  tagline,
  description,
  subServices,
  index = 0,
}: PillarCardProps) {
  const svgIcon = iconSvgs[icon] || iconSvgs['📊']

  return (
    <div
      className="reveal card p-8"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className="mb-6 w-14 h-14 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/70">
        {svgIcon}
      </div>

      {/* Title */}
      <h3 className="text-white mb-2 text-xl font-semibold">{title}</h3>

      {/* Tagline */}
      <p className="text-[#0070F3] text-sm font-medium mb-5">{tagline}</p>

      {/* Description */}
      <p className="text-white/50 leading-relaxed text-[15px] mb-6">{description}</p>

      {/* Separator */}
      <div className="mb-6 h-px w-full bg-white/[0.08]" />

      {/* Sub-services */}
      <div>
        <p className="mb-4 text-xs font-medium uppercase tracking-wider text-white/30">
          Qué incluye
        </p>
        <div className="flex flex-wrap gap-2">
          {subServices.map((service, idx) => (
            <span
              key={idx}
              className="inline-flex items-center text-sm px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-md text-white/60 hover:text-white/80 hover:border-white/15 transition-all duration-200 cursor-default"
            >
              {service.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
