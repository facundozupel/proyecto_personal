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

const colorClasses = {
  primary: {
    iconBg: 'from-primary-500/25 to-primary-600/15',
    iconShadow: 'shadow-primary-500/20',
    iconColor: 'text-primary-400',
    tagline: 'from-primary-400 to-accent-400',
  },
  success: {
    iconBg: 'from-success-500/25 to-success-600/15',
    iconShadow: 'shadow-success-500/20',
    iconColor: 'text-success-400',
    tagline: 'from-success-400 to-primary-400',
  },
  accent: {
    iconBg: 'from-accent-500/25 to-accent-600/15',
    iconShadow: 'shadow-accent-500/20',
    iconColor: 'text-accent-400',
    tagline: 'from-accent-400 to-highlight-400',
  },
  purple: {
    iconBg: 'from-purple-500/25 to-purple-600/15',
    iconShadow: 'shadow-purple-500/20',
    iconColor: 'text-purple-400',
    tagline: 'from-purple-400 to-primary-400',
  },
}

const iconSvgs: Record<string, JSX.Element> = {
  '📊': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  '🎯': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  '📈': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  '⚡': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
}

export default function PillarCard({
  icon,
  title,
  tagline,
  description,
  subServices,
  color,
  index = 0,
}: PillarCardProps) {
  const colors = colorClasses[color]
  const svgIcon = iconSvgs[icon] || iconSvgs['📊']

  return (
    <div
      className="group relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all duration-500 hover:-translate-y-4 hover:border-white/15 hover:bg-white/[0.04] hover:shadow-2xl reveal"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Icon */}
      <div
        className={`relative mb-6 inline-flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-gradient-to-br ${colors.iconBg} ${colors.iconColor} shadow-lg ${colors.iconShadow} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
      >
        {svgIcon}
      </div>

      {/* Title */}
      <h3 className="relative mb-2 font-display text-xl font-bold text-white md:text-2xl">
        {title}
      </h3>

      {/* Tagline */}
      <p className={`relative mb-5 text-sm font-semibold bg-gradient-to-r ${colors.tagline} bg-clip-text text-transparent`}>
        {tagline}
      </p>

      {/* Description */}
      <p className="relative mb-6 text-white/60 leading-relaxed">{description}</p>

      {/* Separator */}
      <div className="relative mb-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Sub-services */}
      <div className="relative">
        <p className="mb-4 text-xs font-bold uppercase tracking-wider text-white/40">
          Qué incluye
        </p>
        <div className="flex flex-wrap gap-2">
          {subServices.map((service, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2 text-sm px-3 py-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full text-white/70 hover:bg-white/[0.08] hover:text-white/90 transition-all cursor-default"
            >
              {service.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
