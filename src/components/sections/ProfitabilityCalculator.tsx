import { useState } from 'react'

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

  const getCurrencySymbol = (currency: string) => {
    const symbols: Record<string, string> = {
      USD: '$', EUR: '€', GBP: '£', ARS: '$', MXN: '$', COP: '$', CLP: '$',
    }
    return symbols[currency] || currency
  }

  const formatNumber = (num: number) => new Intl.NumberFormat('es-ES').format(num)

  return (
    <div className="w-full max-w-4xl mx-auto" data-testid="profitability-calculator">
      <div className="mb-10">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-black/45 mb-4">
          Un pequeño juego
        </p>
        <h2 className="text-[#1a1a1a] mb-4">
          ¿Ya sabes cuánto más podrías rentabilizar?
        </h2>
        <p className="text-black/45 max-w-3xl leading-relaxed">
          Este ejercicio te permite visualizar cómo impacta la mejora en métricas clave de visibilidad en la rentabilidad de tu negocio.
        </p>
      </div>

      {!isCalculating ? (
        <div className="card p-8">
          <p className="text-black/45 mb-8 text-center font-medium">
            Ingresa tus datos actuales para simular el crecimiento de tu rentabilidad
          </p>

          <div className="space-y-6">
            <div>
              <label htmlFor="currentMetric" className="block text-sm font-medium text-black/55 mb-2">
                Métrica actual (clicks orgánicos / sesiones GA4)
              </label>
              <input
                type="number"
                id="currentMetric"
                min="0"
                value={baseline.currentMetric || ''}
                onChange={(e) => handleBaselineChange('currentMetric', Number(e.target.value))}
                className="w-full px-4 py-3 bg-white border border-black/[0.1] rounded-lg text-[#1a1a1a] placeholder-black/30 focus:ring-2 focus:ring-[#BF551A] focus:border-[#BF551A] transition-colors outline-none"
                placeholder="Ej: 1000"
              />
            </div>

            <div>
              <label htmlFor="currentRevenue" className="block text-sm font-medium text-black/55 mb-2">
                Ganancia actual en este canal
              </label>
              <input
                type="number"
                id="currentRevenue"
                min="0"
                value={baseline.currentRevenue || ''}
                onChange={(e) => handleBaselineChange('currentRevenue', Number(e.target.value))}
                className="w-full px-4 py-3 bg-white border border-black/[0.1] rounded-lg text-[#1a1a1a] placeholder-black/30 focus:ring-2 focus:ring-[#BF551A] focus:border-[#BF551A] transition-colors outline-none"
                placeholder="Ej: 5000"
              />
            </div>

            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-black/55 mb-2">
                Moneda
              </label>
              <select
                id="currency"
                value={baseline.currency}
                onChange={(e) => handleBaselineChange('currency', e.target.value)}
                className="w-full px-4 py-3 bg-white border border-black/[0.1] rounded-lg text-[#1a1a1a] focus:ring-2 focus:ring-[#BF551A] focus:border-[#BF551A] transition-colors outline-none"
              >
                <option value="USD" className="bg-[#FCFAF2]">USD - Dólar estadounidense</option>
                <option value="EUR" className="bg-[#FCFAF2]">EUR - Euro</option>
                <option value="GBP" className="bg-[#FCFAF2]">GBP - Libra esterlina</option>
                <option value="ARS" className="bg-[#FCFAF2]">ARS - Peso argentino</option>
                <option value="MXN" className="bg-[#FCFAF2]">MXN - Peso mexicano</option>
                <option value="COP" className="bg-[#FCFAF2]">COP - Peso colombiano</option>
                <option value="CLP" className="bg-[#FCFAF2]">CLP - Peso chileno</option>
              </select>
            </div>

            <button
              onClick={handleStartCalculating}
              disabled={baseline.currentMetric <= 0 || baseline.currentRevenue <= 0}
              className="w-full bg-[#BF551A] hover:bg-[#A04716] disabled:bg-black/[0.04] disabled:text-black/25 disabled:cursor-not-allowed text-[#1a1a1a] font-medium py-3.5 rounded-lg transition-all duration-200"
            >
              Simular Crecimiento
            </button>
          </div>
        </div>
      ) : (
        <div className="card p-8">
          <div className="mb-8 pb-6 border-b border-black/[0.1]">
            <div className="grid grid-cols-2 gap-4 text-sm text-black/45">
              <div>
                <span className="font-medium">Métrica actual:</span> {formatNumber(baseline.currentMetric)}
              </div>
              <div>
                <span className="font-medium">Ganancia actual:</span> {getCurrencySymbol(baseline.currency)}{formatNumber(baseline.currentRevenue)}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="trafficSlider" className="block text-sm font-medium text-black/55 mb-4">
              Simula el cambio de tráfico (mueve el slider)
            </label>
            <input
              type="range"
              id="trafficSlider"
              min="50"
              max="200"
              step="5"
              value={trafficMultiplier}
              onChange={(e) => setTrafficMultiplier(Number(e.target.value))}
              className="w-full h-2 bg-black/[0.04] rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #BF551A 0%, #BF551A ${(trafficMultiplier - 50) / 1.5}%, rgba(255,255,255,0.08) ${(trafficMultiplier - 50) / 1.5}%, rgba(255,255,255,0.08) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-black/25 mt-2">
              <span>-50%</span>
              <span className="font-medium text-[#1a1a1a]">{trafficMultiplier}%</span>
              <span>+100%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-white border border-black/[0.1] p-5">
              <p className="text-xs text-black/35 mb-1">Tráfico Base</p>
              <p className="text-2xl font-bold text-[#1a1a1a] tracking-tight">{formatNumber(baseline.currentMetric)}</p>
            </div>

            <div className="rounded-xl bg-[#BF551A]/10 border border-[#BF551A]/20 p-5">
              <p className="text-xs text-[#BF551A] mb-1">Tráfico Proyectado</p>
              <p className="text-2xl font-bold text-[#D4763E] tracking-tight">{formatNumber(projectedTraffic)}</p>
            </div>

            <div className={`rounded-xl p-5 ${revenueIncrease >= 0 ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
              <p className={`text-xs mb-1 ${revenueIncrease >= 0 ? 'text-green-400' : 'text-red-400'}`}>Ganancia Proyectada</p>
              <p className={`text-2xl font-bold tracking-tight ${revenueIncrease >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                {getCurrencySymbol(baseline.currency)}{formatNumber(projectedRevenue)}
              </p>
            </div>
          </div>

          <div className={`mt-6 p-6 rounded-xl ${revenueIncrease >= 0 ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm mb-1 ${revenueIncrease >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {revenueIncrease >= 0 ? 'Incremento de ganancia' : 'Reducción de ganancia'}
                </p>
                <p className={`text-3xl font-bold tracking-tight ${revenueIncrease >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                  {revenueIncrease >= 0 ? '+' : ''}{getCurrencySymbol(baseline.currency)}{formatNumber(Math.abs(revenueIncrease))}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-4xl font-bold tracking-tight ${revenueIncrease >= 0 ? 'text-green-300' : 'text-red-300'}`}>
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
            className="mt-6 w-full text-black/45 hover:text-[#1a1a1a] font-medium py-3 border border-black/[0.1] rounded-lg hover:border-black/[0.15] hover:bg-black/[0.03] transition-all duration-200"
          >
            Volver a ingresar datos
          </button>
        </div>
      )}

      <div className="mt-10 text-center">
        <p className="text-black/45 leading-relaxed max-w-3xl mx-auto">
          Si no conoces los datos necesarios, seguramente estás perdiendo muchas oportunidades para rentabilizar tu negocio.{' '}
          <span className="font-medium text-[#1a1a1a]">El trabajo con datos reales en cada canal es mi especialidad.</span>
        </p>
        <a
          href="/calculadora-roi-seo"
          className="inline-flex items-center gap-2 mt-6 text-[#BF551A] hover:text-[#D4763E] font-medium transition-colors"
        >
          Calculá el ROI real de tu inversión en SEO
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  )
}
