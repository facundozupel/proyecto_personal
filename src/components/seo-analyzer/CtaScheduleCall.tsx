declare global {
  interface Window {
    posthog?: { capture: (event: string, properties?: Record<string, unknown>) => void };
  }
}

export function CtaScheduleCall() {
  function handleCtaClick() {
    window.posthog?.capture('seo_analyzer_cta_clicked', { source: 'schedule_call_banner' });
  }

  return (
    <div className="bg-[#BF551A]/10 border border-[#BF551A]/20 rounded-xl px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-sm text-black/80">
        <strong className="text-[#1a1a1a]">Querés una auditoría SEO completa?</strong>{' '}
        Agenda una llamada con Facundo.
      </p>
      <button
        data-open-contact
        onClick={handleCtaClick}
        className="px-5 py-2 bg-[#BF551A] text-white text-sm font-semibold rounded-lg hover:bg-[#A04716] transition-all duration-200 whitespace-nowrap cursor-pointer"
      >
        Agendar llamada
      </button>
    </div>
  );
}
