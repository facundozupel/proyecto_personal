import type { ReactNode } from 'react'

interface ServiceCardProps {
  icon: string | ReactNode
  title: string
  description: string
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div
      data-testid="service-card"
      className="group card p-6 md:p-8 hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Icon */}
      <div className="mb-4 text-4xl">{icon}</div>

      {/* Title */}
      <h3 className="mb-3 text-xl font-semibold text-white md:text-2xl group-hover:text-[#3291FF] transition-colors duration-200">
        {title}
      </h3>

      {/* Description */}
      <p className="text-white/50 leading-relaxed">{description}</p>
    </div>
  )
}
