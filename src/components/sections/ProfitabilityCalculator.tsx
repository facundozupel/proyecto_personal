import { useState, useEffect } from 'react'
import { Heading } from '@/components/ui/Heading'

interface BaselineData {
  channel: string
  currentMetric: number
  currentRevenue: number
  currency: string
}

export function ProfitabilityCalculator() {
  const [baseline, setBaseline] = useState<BaselineData>({
    channel: '',
    currentMetric: 0,
    currentRevenue: 0,
    currency: 'USD',
  })

  const [isCalculating, setIsCalculating] = useState(false)
  const [trafficMultiplier, setTrafficMultiplier] = useState(100) // 100% = baseline

  // Calculate projections
  const projectedTraffic = Math.round((baseline.currentMetric * trafficMultiplier) / 100)
  const revenuePerVisit = baseline.currentMetric > 0 ? baseline.currentRevenue / baseline.currentMetric : 0
  const projectedRevenue = Math.round(projectedTraffic * revenuePerVisit)
  const revenueIncrease = projectedRevenue - baseline.currentRevenue
  const percentageIncrease = baseline.currentRevenue > 0
    ? ((revenueIncrease / baseline.currentRevenue) * 100).toFixed(1)
    : '0'

  const handleBaselineChange = (field: keyof BaselineData, value: string | number) => {
    setBaseline(prev => ({ ...prev, [field]: value }))
  }

  const handleStartCalculating = () => {
    if (baseline.currentMetric > 0 && baseline.currentRevenue > 0) {
      setIsCalculating(true)
    }
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrafficMultiplier(Number(e.target.value))
  }

  const getCurrencySymbol = (currency: string) => {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      ARS: '$',
      MXN: '$',
      COP: '$',
      CLP: '$',
    }
    return symbols[currency] || currency
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-ES').format(num)
  }

  return (
    <div
      className="w-full max-w-4xl mx-auto"
      data-testid="profitability-calculator"
    >
      <Heading level={2} className="text-center mb-4">
        ¿Ya sabes cuánto más podrías rentabilizar?
      </Heading>

      <p className="text-neutral-600 text-center mb-8 max-w-3xl mx-auto">
        Este ejercicio te permite visualizar cómo impacta la mejora en métricas clave de visibilidad (como tráfico orgánico o sesiones) en la rentabilidad de tu negocio. Con solo 2 datos simples, podrás obtener una visión genérica e hipotética del potencial de crecimiento.
      </p>

      {!isCalculating ? (
        /* Initial Form */
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200">
          <p className="text-neutral-600 mb-6 text-center font-medium">
            Ingresa tus datos actuales para simular el crecimiento de tu rentabilidad
          </p>

          <div className="space-y-6">

            {/* Current Metric */}
            <div>
              <label htmlFor="currentMetric" className="block text-sm font-medium text-neutral-700 mb-2">
                Métrica actual (clicks orgánicos / sesiones GA4)
              </label>
              <input
                type="number"
                id="currentMetric"
                aria-label="Métrica actual (clicks orgánicos / sesiones GA4)"
                min="0"
                value={baseline.currentMetric || ''}
                onChange={(e) => handleBaselineChange('currentMetric', Number(e.target.value))}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="Ej: 1000"
              />
            </div>

            {/* Current Revenue */}
            <div>
              <label htmlFor="currentRevenue" className="block text-sm font-medium text-neutral-700 mb-2">
                Ganancia actual en este canal
              </label>
              <input
                type="number"
                id="currentRevenue"
                aria-label="Ganancia actual en este canal"
                min="0"
                value={baseline.currentRevenue || ''}
                onChange={(e) => handleBaselineChange('currentRevenue', Number(e.target.value))}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="Ej: 5000"
              />
            </div>

            {/* Currency */}
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-neutral-700 mb-2">
                Moneda
              </label>
              <select
                id="currency"
                aria-label="Moneda"
                value={baseline.currency}
                onChange={(e) => handleBaselineChange('currency', e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              >
                <option value="USD">USD - Dólar estadounidense</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - Libra esterlina</option>
                <option value="ARS">ARS - Peso argentino</option>
                <option value="MXN">MXN - Peso mexicano</option>
                <option value="COP">COP - Peso colombiano</option>
                <option value="CLP">CLP - Peso chileno</option>
              </select>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleStartCalculating}
              disabled={baseline.currentMetric <= 0 || baseline.currentRevenue <= 0}
              className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors duration-200"
            >
              Simular Crecimiento
            </button>
          </div>
        </div>
      ) : (
        /* Interactive Calculator */
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200">
          {/* Header Info */}
          <div className="mb-8 pb-6 border-b border-neutral-200">
            <div className="grid grid-cols-2 gap-4 text-sm text-neutral-600">
              <div>
                <span className="font-medium">Métrica actual:</span> {formatNumber(baseline.currentMetric)}
              </div>
              <div>
                <span className="font-medium">Ganancia actual:</span> {getCurrencySymbol(baseline.currency)}{formatNumber(baseline.currentRevenue)}
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="mb-8">
            <label htmlFor="trafficSlider" className="block text-sm font-medium text-neutral-700 mb-3">
              Simula el cambio de tráfico (mueve el slider)
            </label>
            <input
              type="range"
              id="trafficSlider"
              role="slider"
              min="50"
              max="200"
              step="5"
              value={trafficMultiplier}
              onChange={handleSliderChange}
              className="w-full h-3 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
              style={{
                background: `linear-gradient(to right, #00843D 0%, #00843D ${(trafficMultiplier - 50) / 1.5}%, #e5e5e5 ${(trafficMultiplier - 50) / 1.5}%, #e5e5e5 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-2">
              <span>-50%</span>
              <span className="font-semibold text-neutral-700">{trafficMultiplier}%</span>
              <span>+100%</span>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Traffic */}
            <div className="bg-neutral-50 rounded-lg p-4" data-testid="current-traffic">
              <p className="text-xs text-neutral-600 mb-1">Tráfico Base</p>
              <p className="text-2xl font-bold text-neutral-800">{formatNumber(baseline.currentMetric)}</p>
            </div>

            {/* Projected Traffic */}
            <div className="bg-primary-50 rounded-lg p-4" data-testid="projected-traffic">
              <p className="text-xs text-primary-700 mb-1">Tráfico Proyectado</p>
              <p className="text-2xl font-bold text-primary-800">{formatNumber(projectedTraffic)}</p>
            </div>

            {/* Projected Revenue */}
            <div className={`${revenueIncrease >= 0 ? 'bg-success-50' : 'bg-red-50'} rounded-lg p-4`} data-testid="projected-revenue">
              <p className={`text-xs ${revenueIncrease >= 0 ? 'text-success-700' : 'text-red-700'} mb-1`}>Ganancia Proyectada</p>
              <p className={`text-2xl font-bold ${revenueIncrease >= 0 ? 'text-success-800' : 'text-red-800'}`}>
                {getCurrencySymbol(baseline.currency)}{formatNumber(projectedRevenue)}
              </p>
            </div>
          </div>

          {/* Revenue Increase Summary */}
          <div
            className={`mt-6 p-6 rounded-lg ${revenueIncrease >= 0 ? 'bg-success-100 border border-success-200' : 'bg-red-100 border border-red-200'}`}
            data-testid="revenue-increase"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${revenueIncrease >= 0 ? 'text-success-700' : 'text-red-700'} mb-1`}>
                  {revenueIncrease >= 0 ? 'Incremento de ganancia' : 'Reducción de ganancia'}
                </p>
                <p className={`text-3xl font-bold ${revenueIncrease >= 0 ? 'text-success-800' : 'text-red-800'}`}>
                  {revenueIncrease >= 0 ? '+' : ''}{getCurrencySymbol(baseline.currency)}{formatNumber(Math.abs(revenueIncrease))}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-4xl font-bold ${revenueIncrease >= 0 ? 'text-success-800' : 'text-red-800'}`}>
                  {revenueIncrease >= 0 ? '+' : ''}{percentageIncrease}%
                </p>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              setIsCalculating(false)
              setTrafficMultiplier(100)
            }}
            className="mt-6 w-full text-neutral-600 hover:text-primary-600 font-medium py-3 border border-neutral-300 rounded-lg hover:border-primary-500 transition-colors"
          >
            ← Volver a ingresar datos
          </button>
        </div>
      )}

      {/* CTA Message */}
      <div className="mt-8 text-center">
        <p className="text-neutral-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          Si no conoces los datos necesarios, seguramente estás perdiendo muchas oportunidades para rentabilizar tu negocio.{' '}
          <span className="font-semibold text-primary-800">El trabajo con datos reales en cada canal es mi especialidad.</span>
        </p>
      </div>
    </div>
  )
}
