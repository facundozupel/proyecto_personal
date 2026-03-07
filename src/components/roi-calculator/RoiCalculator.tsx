import { useState } from 'react'

interface FormData {
  monthlyInvestment: number
  currentTraffic: number
  conversionRate: number
  avgConversionValue: number
  monthlyGrowthRate: number
  timeframe: 6 | 12
  currency: string
}

interface MonthProjection {
  month: number
  traffic: number
  revenue: number
  additionalRevenue: number
  cumulativeInvestment: number
  cumulativeAdditionalRevenue: number
}

interface Results {
  roi: number
  totalAdditionalRevenue: number
  totalInvestment: number
  paybackMonth: number | null
  projections: MonthProjection[]
  baselineMonthlyRevenue: number
}

export function RoiCalculator() {
  const [form, setForm] = useState<FormData>({
    monthlyInvestment: 0,
    currentTraffic: 0,
    conversionRate: 2,
    avgConversionValue: 0,
    monthlyGrowthRate: 10,
    timeframe: 12,
    currency: 'USD',
  })

  const [results, setResults] = useState<Results | null>(null)

  const getCurrencySymbol = (currency: string) => {
    const symbols: Record<string, string> = {
      USD: '$', EUR: '€', GBP: '£', ARS: '$', MXN: '$', COP: '$', CLP: '$',
    }
    return symbols[currency] || currency
  }

  const formatNumber = (num: number) => new Intl.NumberFormat('es-ES').format(Math.round(num))

  const handleChange = (field: keyof FormData, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const calculate = () => {
    const baselineMonthlyRevenue = form.currentTraffic * (form.conversionRate / 100) * form.avgConversionValue

    const projections: MonthProjection[] = []
    let totalAdditionalRevenue = 0
    let paybackMonth: number | null = null
    let cumulativeAdditionalRevenue = 0

    for (let i = 1; i <= form.timeframe; i++) {
      const traffic = Math.round(form.currentTraffic * Math.pow(1 + form.monthlyGrowthRate / 100, i))
      const revenue = traffic * (form.conversionRate / 100) * form.avgConversionValue
      const additionalRevenue = revenue - baselineMonthlyRevenue
      cumulativeAdditionalRevenue += additionalRevenue
      const cumulativeInvestment = form.monthlyInvestment * i

      if (paybackMonth === null && cumulativeAdditionalRevenue >= cumulativeInvestment) {
        paybackMonth = i
      }

      projections.push({
        month: i,
        traffic,
        revenue,
        additionalRevenue,
        cumulativeInvestment,
        cumulativeAdditionalRevenue,
      })

      totalAdditionalRevenue += additionalRevenue
    }

    const totalInvestment = form.monthlyInvestment * form.timeframe
    const roi = totalInvestment > 0 ? ((totalAdditionalRevenue - totalInvestment) / totalInvestment) * 100 : 0

    setResults({
      roi,
      totalAdditionalRevenue,
      totalInvestment,
      paybackMonth,
      projections,
      baselineMonthlyRevenue,
    })
  }

  const isFormValid =
    form.monthlyInvestment > 0 &&
    form.currentTraffic > 0 &&
    form.conversionRate > 0 &&
    form.avgConversionValue > 0 &&
    form.monthlyGrowthRate > 0

  const sym = getCurrencySymbol(form.currency)

  if (results) {
    const roiPositive = results.roi >= 0
    const maxBar = Math.max(results.totalInvestment, results.totalAdditionalRevenue)
    const investmentPct = maxBar > 0 ? (results.totalInvestment / maxBar) * 100 : 0
    const revenuePct = maxBar > 0 ? (results.totalAdditionalRevenue / maxBar) * 100 : 0

    return (
      <div className="w-full max-w-4xl mx-auto">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className={`rounded-xl p-6 ${roiPositive ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
            <p className={`text-xs mb-1 ${roiPositive ? 'text-green-400' : 'text-red-400'}`}>ROI Estimado</p>
            <p className={`text-4xl font-bold tracking-tight ${roiPositive ? 'text-green-300' : 'text-red-300'}`}>
              {results.roi >= 0 ? '+' : ''}{results.roi.toFixed(0)}%
            </p>
          </div>

          <div className="rounded-xl bg-[#BF551A]/10 border border-[#BF551A]/20 p-6">
            <p className="text-xs text-[#BF551A] mb-1">Revenue Adicional Total</p>
            <p className="text-3xl font-bold text-[#D4763E] tracking-tight">
              {sym}{formatNumber(results.totalAdditionalRevenue)}
            </p>
          </div>

          <div className="rounded-xl bg-white border border-black/[0.1] p-6">
            <p className="text-xs text-black/35 mb-1">Mes de Payback</p>
            <p className="text-3xl font-bold text-[#1a1a1a] tracking-tight">
              {results.paybackMonth ? `Mes ${results.paybackMonth}` : `+${form.timeframe} meses`}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="card p-6 mb-8">
          <p className="text-sm font-medium text-black/55 mb-4">Inversión vs Retorno</p>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-black/45 mb-1">
                <span>Inversión total</span>
                <span>{sym}{formatNumber(results.totalInvestment)}</span>
              </div>
              <div className="w-full h-3 bg-black/[0.04] rounded-full overflow-hidden">
                <div
                  className="h-full bg-white/30 rounded-full transition-all duration-700"
                  style={{ width: `${investmentPct}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-black/45 mb-1">
                <span>Revenue adicional</span>
                <span>{sym}{formatNumber(results.totalAdditionalRevenue)}</span>
              </div>
              <div className="w-full h-3 bg-black/[0.04] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${roiPositive ? 'bg-green-500/60' : 'bg-red-500/60'}`}
                  style={{ width: `${revenuePct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Projection Table */}
        <div className="card overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/[0.1]">
                  <th className="text-left text-black/45 font-medium px-4 py-3">Mes</th>
                  <th className="text-right text-black/45 font-medium px-4 py-3">Tráfico</th>
                  <th className="text-right text-black/45 font-medium px-4 py-3">Revenue</th>
                  <th className="text-right text-black/45 font-medium px-4 py-3">Rev. Adicional</th>
                  <th className="text-right text-black/45 font-medium px-4 py-3">Inversión Acum.</th>
                </tr>
              </thead>
              <tbody>
                {results.projections.map((row) => (
                  <tr
                    key={row.month}
                    className={`border-b border-black/[0.04] ${row.month === results.paybackMonth ? 'bg-green-500/5' : ''}`}
                  >
                    <td className="px-4 py-2.5 text-black/55">{row.month}</td>
                    <td className="px-4 py-2.5 text-right text-[#1a1a1a]">{formatNumber(row.traffic)}</td>
                    <td className="px-4 py-2.5 text-right text-[#1a1a1a]">{sym}{formatNumber(row.revenue)}</td>
                    <td className={`px-4 py-2.5 text-right font-medium ${row.additionalRevenue >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {row.additionalRevenue >= 0 ? '+' : ''}{sym}{formatNumber(row.additionalRevenue)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-black/45">{sym}{formatNumber(row.cumulativeInvestment)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-black/25 text-center mb-6">
          * Estos valores son estimaciones basadas en los datos ingresados. Los resultados reales dependen de factores como la competencia, la calidad del contenido y la autoridad del dominio.
        </p>

        {/* Recalculate */}
        <button
          onClick={() => setResults(null)}
          className="w-full text-black/45 hover:text-[#1a1a1a] font-medium py-3 border border-black/[0.1] rounded-lg hover:border-black/[0.15] hover:bg-black/[0.03] transition-all duration-200"
        >
          Recalcular
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="card p-8">
        <p className="text-black/45 mb-8 text-center font-medium">
          Ingresa tus datos para calcular el retorno de tu inversión en SEO
        </p>

        <div className="space-y-6">
          {/* Monthly Investment */}
          <div>
            <label htmlFor="monthlyInvestment" className="block text-sm font-medium text-black/55 mb-2">
              Inversión mensual en SEO ({sym})
            </label>
            <input
              type="number"
              id="monthlyInvestment"
              min="0"
              value={form.monthlyInvestment || ''}
              onChange={(e) => handleChange('monthlyInvestment', Number(e.target.value))}
              className="w-full px-4 py-3 bg-white border border-black/[0.1] rounded-lg text-[#1a1a1a] placeholder-black/30 focus:ring-2 focus:ring-[#BF551A] focus:border-[#BF551A] transition-colors outline-none"
              placeholder="Ej: 1500"
            />
          </div>

          {/* Current Traffic */}
          <div>
            <label htmlFor="currentTraffic" className="block text-sm font-medium text-black/55 mb-2">
              Tráfico orgánico mensual actual
            </label>
            <input
              type="number"
              id="currentTraffic"
              min="0"
              value={form.currentTraffic || ''}
              onChange={(e) => handleChange('currentTraffic', Number(e.target.value))}
              className="w-full px-4 py-3 bg-white border border-black/[0.1] rounded-lg text-[#1a1a1a] placeholder-black/30 focus:ring-2 focus:ring-[#BF551A] focus:border-[#BF551A] transition-colors outline-none"
              placeholder="Ej: 5000"
            />
          </div>

          {/* Two-column row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="conversionRate" className="block text-sm font-medium text-black/55 mb-2">
                Tasa de conversión (%)
              </label>
              <input
                type="number"
                id="conversionRate"
                min="0"
                step="0.1"
                value={form.conversionRate || ''}
                onChange={(e) => handleChange('conversionRate', Number(e.target.value))}
                className="w-full px-4 py-3 bg-white border border-black/[0.1] rounded-lg text-[#1a1a1a] placeholder-black/30 focus:ring-2 focus:ring-[#BF551A] focus:border-[#BF551A] transition-colors outline-none"
                placeholder="Ej: 2"
              />
            </div>
            <div>
              <label htmlFor="avgConversionValue" className="block text-sm font-medium text-black/55 mb-2">
                Valor por conversión ({sym})
              </label>
              <input
                type="number"
                id="avgConversionValue"
                min="0"
                value={form.avgConversionValue || ''}
                onChange={(e) => handleChange('avgConversionValue', Number(e.target.value))}
                className="w-full px-4 py-3 bg-white border border-black/[0.1] rounded-lg text-[#1a1a1a] placeholder-black/30 focus:ring-2 focus:ring-[#BF551A] focus:border-[#BF551A] transition-colors outline-none"
                placeholder="Ej: 200"
              />
            </div>
          </div>

          {/* Two-column row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="monthlyGrowthRate" className="block text-sm font-medium text-black/55 mb-2">
                Crecimiento mensual de tráfico (%)
              </label>
              <input
                type="number"
                id="monthlyGrowthRate"
                min="0"
                step="1"
                value={form.monthlyGrowthRate || ''}
                onChange={(e) => handleChange('monthlyGrowthRate', Number(e.target.value))}
                className="w-full px-4 py-3 bg-white border border-black/[0.1] rounded-lg text-[#1a1a1a] placeholder-black/30 focus:ring-2 focus:ring-[#BF551A] focus:border-[#BF551A] transition-colors outline-none"
                placeholder="Ej: 10"
              />
            </div>
            <div>
              <label htmlFor="timeframe" className="block text-sm font-medium text-black/55 mb-2">
                Período de proyección
              </label>
              <select
                id="timeframe"
                value={form.timeframe}
                onChange={(e) => handleChange('timeframe', Number(e.target.value))}
                className="w-full px-4 py-3 bg-white border border-black/[0.1] rounded-lg text-[#1a1a1a] focus:ring-2 focus:ring-[#BF551A] focus:border-[#BF551A] transition-colors outline-none"
              >
                <option value={6} className="bg-[#FCFAF2]">6 meses</option>
                <option value={12} className="bg-[#FCFAF2]">12 meses</option>
              </select>
            </div>
          </div>

          {/* Currency */}
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-black/55 mb-2">
              Moneda
            </label>
            <select
              id="currency"
              value={form.currency}
              onChange={(e) => handleChange('currency', e.target.value)}
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

          {/* Submit */}
          <button
            onClick={calculate}
            disabled={!isFormValid}
            className="w-full bg-[#BF551A] hover:bg-[#A04716] disabled:bg-black/[0.04] disabled:text-black/25 disabled:cursor-not-allowed text-[#1a1a1a] font-medium py-3.5 rounded-lg transition-all duration-200"
          >
            Calcular ROI
          </button>
        </div>
      </div>
    </div>
  )
}
