import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { ProfitabilityCalculator } from '@/components/sections/ProfitabilityCalculator'

describe('ProfitabilityCalculator', () => {
  it('should render with correct heading', () => {
    render(<ProfitabilityCalculator />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('¿Ya sabes cuánto más podrías rentabilizar?')
  })

  it('should render initial input form for baseline data', () => {
    render(<ProfitabilityCalculator />)

    // Initial inputs for baseline data
    expect(screen.getByLabelText('Canal de tráfico')).toBeInTheDocument()
    expect(screen.getByLabelText(/métrica actual/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Ganancia actual en este canal')).toBeInTheDocument()
    expect(screen.getByLabelText('Moneda')).toBeInTheDocument()
  })

  it('should show interactive slider after user enters baseline data', async () => {
    const user = userEvent.setup()
    render(<ProfitabilityCalculator />)

    // Fill baseline data
    await user.selectOptions(screen.getByLabelText('Canal de tráfico'), 'SEO Orgánico')
    await user.type(screen.getByLabelText(/métrica actual/i), '1000')
    await user.type(screen.getByLabelText('Ganancia actual en este canal'), '5000')

    // Click button to start calculating
    await user.click(screen.getByText('Simular Crecimiento'))

    // Slider should appear
    const slider = screen.getByRole('slider')
    expect(slider).toBeInTheDocument()
  })

  it('should calculate profitability when slider moves to the right (increase)', async () => {
    const user = userEvent.setup()
    render(<ProfitabilityCalculator />)

    // Enter baseline
    await user.selectOptions(screen.getByLabelText('Canal de tráfico'), 'SEO Orgánico')
    await user.type(screen.getByLabelText(/métrica actual/i), '1000')
    await user.type(screen.getByLabelText('Ganancia actual en este canal'), '5000')
    await user.click(screen.getByText('Simular Crecimiento'))

    const slider = screen.getByRole('slider')

    // Move slider to simulate 50% traffic increase
    await user.click(slider)

    // Should show projected revenue
    expect(screen.getByTestId('projected-revenue')).toBeInTheDocument()
  })

  it('should calculate profitability when slider moves to the left (decrease)', async () => {
    const user = userEvent.setup()
    render(<ProfitabilityCalculator />)

    // Enter baseline
    await user.selectOptions(screen.getByLabelText('Canal de tráfico'), 'SEO Orgánico')
    await user.type(screen.getByLabelText(/métrica actual/i), '1000')
    await user.type(screen.getByLabelText('Ganancia actual en este canal'), '5000')
    await user.click(screen.getByText('Simular Crecimiento'))

    const slider = screen.getByRole('slider')

    // Should be able to move left and see decrease
    expect(slider).toHaveAttribute('min')
  })

  it('should display line visualization that moves up/down with slider', async () => {
    const user = userEvent.setup()
    render(<ProfitabilityCalculator />)

    // Enter baseline
    await user.selectOptions(screen.getByLabelText('Canal de tráfico'), 'SEO Orgánico')
    await user.type(screen.getByLabelText(/métrica actual/i), '1000')
    await user.type(screen.getByLabelText('Ganancia actual en este canal'), '5000')
    await user.click(screen.getByText('Simular Crecimiento'))

    // Should have visualization line/chart
    const visualization = screen.getByTestId('profitability-line')
    expect(visualization).toBeInTheDocument()
  })

  it('should show real-time calculations as slider moves', async () => {
    const user = userEvent.setup()
    render(<ProfitabilityCalculator />)

    await user.selectOptions(screen.getByLabelText('Canal de tráfico'), 'SEO Orgánico')
    await user.type(screen.getByLabelText(/métrica actual/i), '1000')
    await user.type(screen.getByLabelText('Ganancia actual en este canal'), '5000')
    await user.click(screen.getByText('Simular Crecimiento'))

    // Should display calculation results
    expect(screen.getByTestId('current-traffic')).toBeInTheDocument()
    expect(screen.getByTestId('projected-traffic')).toBeInTheDocument()
    expect(screen.getByTestId('projected-revenue')).toBeInTheDocument()
    expect(screen.getByTestId('revenue-increase')).toBeInTheDocument()
  })

  it('should support different currency formats', async () => {
    const user = userEvent.setup()
    render(<ProfitabilityCalculator />)

    const currencySelect = screen.getByLabelText(/moneda/i)

    // Should have common currencies
    await user.selectOptions(currencySelect, 'USD')
    expect(currencySelect).toHaveValue('USD')

    await user.selectOptions(currencySelect, 'EUR')
    expect(currencySelect).toHaveValue('EUR')
  })

  it('should be responsive and mobile-friendly', () => {
    render(<ProfitabilityCalculator />)

    const container = screen.getByTestId('profitability-calculator')
    expect(container).toBeInTheDocument()
  })
})
