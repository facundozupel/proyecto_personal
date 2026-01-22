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
  color: 'primary' | 'success' | 'accent'
}

const colorClasses = {
  primary: {
    border: 'border-primary-500',
    iconBg: 'bg-primary-100',
    iconText: 'text-primary-700',
    tagline: 'text-primary-600',
    hoverBorder: 'hover:border-primary-600',
    hoverShadow: 'hover:shadow-primary-100',
  },
  success: {
    border: 'border-success-500',
    iconBg: 'bg-success-100',
    iconText: 'text-success-700',
    tagline: 'text-success-600',
    hoverBorder: 'hover:border-success-600',
    hoverShadow: 'hover:shadow-success-100',
  },
  accent: {
    border: 'border-accent-500',
    iconBg: 'bg-accent-100',
    iconText: 'text-accent-700',
    tagline: 'text-accent-600',
    hoverBorder: 'hover:border-accent-600',
    hoverShadow: 'hover:shadow-accent-100',
  },
}

export default function PillarCard({
  icon,
  title,
  tagline,
  description,
  subServices,
  color,
}: PillarCardProps) {
  const colors = colorClasses[color]

  return (
    <div
      className={`
        group rounded-2xl border-2 ${colors.border} bg-white p-6 md:p-8
        transition-all duration-300 hover:-translate-y-1 ${colors.hoverBorder}
        hover:shadow-xl
      `}
    >
      {/* Icon */}
      <div
        className={`
          mb-5 inline-flex h-16 w-16 items-center justify-center rounded-xl
          ${colors.iconBg} text-3xl
        `}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="mb-2 font-display text-xl font-bold text-neutral-900 md:text-2xl">
        {title}
      </h3>

      {/* Tagline */}
      <p className={`mb-4 text-sm font-semibold uppercase tracking-wide ${colors.tagline}`}>
        {tagline}
      </p>

      {/* Description */}
      <p className="mb-6 text-neutral-600 leading-relaxed">{description}</p>

      {/* Separator */}
      <div className={`mb-6 h-0.5 w-full ${colors.iconBg}`} />

      {/* Sub-services */}
      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
          Qué incluye
        </p>
        <ul className="space-y-3">
          {subServices.map((service, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-lg">{service.icon}</span>
              <span className="text-sm text-neutral-700">{service.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
