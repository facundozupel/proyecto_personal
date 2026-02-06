import { useState } from 'react'
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
  const [trafficMultiplier, setTrafficMultiplier] = useState(100)

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
    <div className="w-full max-w-4xl mx-auto" data-testid="profitability-calculator">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Un pequeño juego
        </div>
        <Heading level={2} className="text-white mb-4">
          ¿Ya sabes cuánto más podrías rentabilizar?
        </Heading>
        <p className="text-white/60 max-w-3xl mx-auto">
          Este ejercicio te permite visualizar cómo impacta la mejora en métricas clave de visibilidad en la rentabilidad de tu negocio.
        </p>
      </div>

      {!isCalculating ? (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-sm">
          <p className="text-white/60 mb-8 text-center font-medium">
            Ingresa tus datos actuales para simular el crecimiento de tu rentabilidad
          </p>

          <div className="space-y-6">
            <div>
              <label htmlFor="currentMetric" className="block text-sm font-medium text-white/70 mb-2">
                Métrica actual (clicks orgánicos / sesiones GA4)
              </label>
              <input
                type="number"
                id="currentMetric"
                min="0"
                value={baseline.currentMetric || ''}
                onChange={(e) => handleBaselineChange('currentMetric', Number(e.target.value))}
                className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="Ej: 1000"
              />
            </div>

            <div>
              <label htmlFor="currentRevenue" className="block text-sm font-medium text-white/70 mb-2">
                Ganancia actual en este canal
              </label>
              <input
                type="number"
                id="currentRevenue"
                min="0"
                value={baseline.currentRevenue || ''}
                onChange={(e) => handleBaselineChange('currentRevenue', Number(e.target.value))}
                className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="Ej: 5000"
              />
            </div>

            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-white/70 mb-2">
                Moneda
              </label>
              <select
                id="currency"
                value={baseline.currency}
                onChange={(e) => handleBaselineChange('currency', e.target.value)}
                className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              >
                <option value="USD" className="bg-neutral-900">USD - Dólar estadounidense</option>
                <option value="EUR" className="bg-neutral-900">EUR - Euro</option>
                <option value="GBP" className="bg-neutral-900">GBP - Libra esterlina</option>
                <option value="ARS" className="bg-neutral-900">ARS - Peso argentino</option>
                <option value="MXN" className="bg-neutral-900">MXN - Peso mexicano</option>
                <option value="COP" className="bg-neutral-900">COP - Peso colombiano</option>
                <option value="CLP" className="bg-neutral-900">CLP - Peso chileno</option>
              </select>
            </div>

            <button
              onClick={handleStartCalculating}
              disabled={baseline.currentMetric <= 0 || baseline.currentRevenue <= 0}
              className="w-full bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 disabled:from-neutral-700 disabled:to-neutral-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-accent-500/20 hover:shadow-accent-500/30"
            >
              Simular Crecimiento
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-sm">
          <div className="mb-8 pb-6 border-b border-white/[0.08]">
            <div className="grid grid-cols-2 gap-4 text-sm text-white/60">
              <div>
                <span className="font-medium">Métrica actual:</span> {formatNumber(baseline.currentMetric)}
              </div>
              <div>
                <span className="font-medium">Ganancia actual:</span> {getCurrencySymbol(baseline.currency)}{formatNumber(baseline.currentRevenue)}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="trafficSlider" className="block text-sm font-medium text-white/70 mb-4">
              Simula el cambio de tráfico (mueve el slider)
            </label>
            <input
              type="range"
              id="trafficSlider"
              min="50"
              max="200"
              step="5"
              value={trafficMultiplier}
              onChange={handleSliderChange}
              className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #00a86b 0%, #00a86b ${(trafficMultiplier - 50) / 1.5}%, rgba(255,255,255,0.1) ${(trafficMultiplier - 50) / 1.5}%, rgba(255,255,255,0.1) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-white/40 mt-2">
              <span>-50%</span>
              <span className="font-semibold text-white">{trafficMultiplier}%</span>
              <span>+100%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-white/[0.05] p-5">
              <p className="text-xs text-white/50 mb-1">Tráfico Base</p>
              <p className="text-2xl font-bold text-white">{formatNumber(baseline.currentMetric)}</p>
            </div>

            <div className="rounded-xl bg-primary-500/10 border border-primary-500/20 p-5">
              <p className="text-xs text-primary-400 mb-1">Tráfico Proyectado</p>
              <p className="text-2xl font-bold text-primary-300">{formatNumber(projectedTraffic)}</p>
            </div>

            <div className={`rounded-xl p-5 ${revenueIncrease >= 0 ? 'bg-success-500/10 border border-success-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
              <p className={`text-xs mb-1 ${revenueIncrease >= 0 ? 'text-success-400' : 'text-red-400'}`}>Ganancia Proyectada</p>
              <p className={`text-2xl font-bold ${revenueIncrease >= 0 ? 'text-success-300' : 'text-red-300'}`}>
                {getCurrencySymbol(baseline.currency)}{formatNumber(projectedRevenue)}
              </p>
            </div>
          </div>

          <div className={`mt-6 p-6 rounded-xl ${revenueIncrease >= 0 ? 'bg-success-500/10 border border-success-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm mb-1 ${revenueIncrease >= 0 ? 'text-success-400' : 'text-red-400'}`}>
                  {revenueIncrease >= 0 ? 'Incremento de ganancia' : 'Reducción de ganancia'}
                </p>
                <p className={`text-3xl font-bold ${revenueIncrease >= 0 ? 'text-success-300' : 'text-red-300'}`}>
                  {revenueIncrease >= 0 ? '+' : ''}{getCurrencySymbol(baseline.currency)}{formatNumber(Math.abs(revenueIncrease))}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-4xl font-bold ${revenueIncrease >= 0 ? 'text-success-300' : 'text-red-300'}`}>
                  {revenueIncrease >= 0 ? '+' : ''}{percentageIncrease}%
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setIsCalculating(false)
              setTrafficMultiplier(100)
            }}
            className="mt-6 w-full text-white/60 hover:text-white font-medium py-3 border border-white/[0.1] rounded-xl hover:border-white/20 hover:bg-white/[0.05] transition-all"
          >
            ← Volver a ingresar datos
          </button>
        </div>
      )}

      <div className="mt-10 text-center">
        <p className="text-white/60 leading-relaxed max-w-3xl mx-auto">
          Si no conoces los datos necesarios, seguramente estás perdiendo muchas oportunidades para rentabilizar tu negocio.{' '}
          <span className="font-semibold text-primary-400">El trabajo con datos reales en cada canal es mi especialidad.</span>
        </p>
      </div>
    </div>
  )
}
