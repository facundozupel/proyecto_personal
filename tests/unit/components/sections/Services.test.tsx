import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Services from '@/components/sections/Services'

describe('Services', () => {
  it('should render the component', () => {
    render(<Services />)
    // El componente debe renderizarse sin errores
    // Verificamos que el heading principal esté presente
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('should display the introduction about ROI', () => {
    render(<Services />)
    // Verificar que la introducción sobre ROI está presente
    expect(screen.getByText(/aumentá tu roi/i)).toBeInTheDocument()
    expect(
      screen.getByText(/estrategias que generan resultados reales/i)
    ).toBeInTheDocument()
  })

  it('should display 5 service cards', () => {
    render(<Services />)
    // Verificar que hay 5 servicios
    const serviceCards = screen.getAllByTestId('service-card')
    expect(serviceCards).toHaveLength(5)
  })

  it('should display SEO Local service', () => {
    render(<Services />)
    expect(screen.getByText(/seo local/i)).toBeInTheDocument()
    expect(
      screen.getByText(/aparecé donde tus clientes te buscan/i)
    ).toBeInTheDocument()
  })

  it('should display Automatización service', () => {
    render(<Services />)
    expect(screen.getByText(/automatización de procesos internos/i)).toBeInTheDocument()
    expect(screen.getByText(/reducí costos y ganá eficiencia/i)).toBeInTheDocument()
  })

  it('should display Email Marketing service', () => {
    render(<Services />)
    expect(screen.getByText(/email marketing inteligente/i)).toBeInTheDocument()
    expect(
      screen.getByText(/conectá con tus leads y clientes de forma personalizada/i)
    ).toBeInTheDocument()
  })

  it('should display SEO Técnico service', () => {
    render(<Services />)
    expect(screen.getByText(/seo técnico/i)).toBeInTheDocument()
    expect(screen.getByText(/optimizamos la base de tu sitio/i)).toBeInTheDocument()
  })

  it('should display Estrategias de contenido service', () => {
    render(<Services />)
    expect(
      screen.getByText(/estrategias de contenido para rrss y youtube/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/transformamos tu contenido en una herramienta/i)
    ).toBeInTheDocument()
  })

  it('should display the conclusion about results', () => {
    render(<Services />)
    expect(screen.getByText(/el resultado:/i)).toBeInTheDocument()
    expect(screen.getByText(/más visibilidad, más eficiencia, más conversiones/i)).toBeInTheDocument()
  })

  it('should have proper heading structure', () => {
    render(<Services />)
    // Debe tener un heading principal (h2)
    const mainHeading = screen.getByRole('heading', { level: 2 })
    expect(mainHeading).toBeInTheDocument()
  })
})
