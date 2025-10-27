import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ServiceCard from '@/components/sections/ServiceCard'

describe('ServiceCard', () => {
  const mockProps = {
    icon: '🔍',
    title: 'SEO Local',
    description: 'Optimiza tu presencia local',
  }

  it('should render the component', () => {
    render(<ServiceCard {...mockProps} />)
    expect(screen.getByTestId('service-card')).toBeInTheDocument()
  })

  it('should display the icon', () => {
    render(<ServiceCard {...mockProps} />)
    expect(screen.getByText('🔍')).toBeInTheDocument()
  })

  it('should display the title', () => {
    render(<ServiceCard {...mockProps} />)
    expect(screen.getByText('SEO Local')).toBeInTheDocument()
  })

  it('should display the description', () => {
    render(<ServiceCard {...mockProps} />)
    expect(screen.getByText('Optimiza tu presencia local')).toBeInTheDocument()
  })

  it('should have heading with correct level', () => {
    render(<ServiceCard {...mockProps} />)
    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toHaveTextContent('SEO Local')
  })

  it('should apply hover styles', () => {
    render(<ServiceCard {...mockProps} />)
    const card = screen.getByTestId('service-card')
    // Verificar que tiene clases de transición para hover
    expect(card.className).toContain('transition')
  })

  it('should have proper card styling', () => {
    render(<ServiceCard {...mockProps} />)
    const card = screen.getByTestId('service-card')
    // Verificar que tiene padding, border, etc.
    expect(card.className).toContain('rounded')
  })
})
