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
      className="group rounded-xl border-2 border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-500 hover:shadow-lg md:p-8"
    >
      {/* Icon */}
      <div className="mb-4 text-4xl">{icon}</div>

      {/* Title */}
      <h3 className="mb-3 font-display text-xl font-semibold text-neutral-900 md:text-2xl">
        {title}
      </h3>

      {/* Description */}
      <p className="text-neutral-600 leading-relaxed">{description}</p>
    </div>
  )
}
